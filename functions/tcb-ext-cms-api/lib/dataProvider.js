// 数据提供程序方法必须为具有data属性的对象返回Promise 。
// 方法	回应格式
// getList	{ data: {Record[]}, total: {int} }
// getOne	{ data: {Record} }
// getMany	{ data: {Record[]} }
// getManyReference	{ data: {Record[]}, total: {int} }
// create	{ data: {Record} }
// update	{ data: {Record} }
// updateMany	{ data: {mixed[]} } 已更新的ID
// delete	{ data: {Record|null} } 已删除的记录（可选）
// deleteMany	{ data: {mixed[]} } 删除记录的ID（可选）
// A {Record}是具有至少一个id属性的对象文字，例如{ id: 123, title: "hello, world" }。
module.exports = (db) => ({
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;

    // q 参数不处理的原因是目前无法实现模糊查询，客户端也没有传递参数名过来
    const { q, ...restFilter } = params.filter;
    const { field, order } = params.sort;

    const collection = db.collection(resource);

    let query = collection.where(restFilter);

    const countRes = await query.count();

    query = query
      .skip((page - 1) * perPage)
      .limit(perPage)
      .orderBy(field, order.toLowerCase());

    const getRes = await query.get();

    if (getRes.code) {
      return getRes;
    }

    const result = {
      data: getRes.data.map((resource) => ({
        ...resource,
        id: resource._id,
      })),
      total: countRes.total,
    };

    return result;
  },

  getOne: async (resource, params) => {
    const collection = db.collection(resource);
    const id = params.id;

    let query = collection.where({
      _id: id,
    });

    const getRes = await query.get();

    const result = {
      data: getRes.data.map((resource) => ({
        ...resource,
        id: resource._id,
      }))[0],
    };

    if (getRes.code) {
      return getRes;
    }

    return result;
  },

  getMany: async (resource, params) => {
    const collection = db.collection(resource);
    let query = collection.where({
      _id: db.command.in(params.ids),
    });

    const getRes = await query.get();

    if (getRes.code) {
      return getRes;
    }

    const result = {
      data: getRes.data.map((resource) => ({
        ...resource,
        id: resource._id,
      })),
    };

    return result;
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
  },

  update: async (resource, params) => {
    const collection = db.collection(resource);
    const id = params.id;
    let query = collection.where({
      _id: id,
    });

    const updateData = {
      ...pareseDate(deepRemoveProperty(params.data, ["_id"])),
      createTime: params.data.createTime && new Date(params.data.createTime),
      updateTime: new Date(),
    };
    const updateRes = await query.update(updateData);

    const getRes = await query.get();

    if (getRes.code) {
      return getRes;
    }

    const data = getRes.data[0];

    const result = {
      data: {
        ...data,
        id: data._id,
      },
    };

    return result;
  },

  updateMany: async (resource, params) => {
    const collection = db.collection(resource);
    let query = collection.where({
      _id: db.command.in(params.ids),
    });

    const updateRes = await query.update(pareseDate(params.data));

    if (updateRes.code) {
      return updateRes;
    }

    const getRes = await query.get();

    if (getRes.code) {
      return getRes;
    }

    const result = {
      data: getRes.data,
    };
    return result;
  },

  create: async (resource, params) => {
    const collection = db.collection(resource);
    const addData = {
      ...pareseDate(params.data),
      createTime: params.data.createTime
        ? new Date(params.data.createTime)
        : new Date(),
      updateTime: new Date(),
    };

    const addRes = await collection.add(addData);

    console.log(addRes);

    if (addRes.code) {
      return addRes;
    }

    const result = {
      data: { ...addData, id: addRes.id },
      id: addRes.id,
    };

    return result;
  },

  delete: async (resource, params) => {
    const collection = db.collection(resource);
    const id = params.id;
    let query = collection.where({
      _id: id,
    });

    const removeRes = await query.remove();

    if (removeRes.code) {
      return removeRes;
    }

    const result = {
      data: {
        id,
      },
    };

    return result;
  },

  deleteMany: async (resource, params) => {
    const collection = db.collection(resource);
    let query = collection.where({
      _id: db.command.in(params.ids),
    });

    const removeRes = await query.remove();

    if (removeRes.code) {
      return removeRes;
    }

    const result = {
      data: params.ids.map((id) => ({ id })),
    };

    return result;
  },
});

// 移除对象属性
function deepRemoveProperty(data, properties) {
  return JSON.parse(
    JSON.stringify(data, function (key, value) {
      if (properties.includes(key)) {
        return undefined;
      } else {
        return value;
      }
    })
  );
}

// 处理日期对象
function pareseDate(data) {
  let result = {};

  for (let key in data) {
    let value = data[key];
    if (isIsoDate(value)) {
      result[key] = new Date(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  var d = new Date(str);
  return d.toISOString() === str;
}
