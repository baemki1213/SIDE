const useRouter = jest.fn();
const push = jest.fn();
const back = jest.fn();
const events = {
  on: jest.fn(),
  off: jest.fn(),
};

useRouter.mockImplementation(() => ({
  push,
  back,
  events,
}));

module.exports = {
  useRouter,
  push,
  back,
  events,
};
