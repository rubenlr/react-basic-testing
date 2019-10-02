export default {
  get: jest.fn(() => Promise.resolve({ data: { omg: 1 } }))
};
