const useRouter = jest.fn();
const push = jest.fn();
const back = jest.fn();

useRouter.mockImplementation(() => ({
  push,
  back,
}));

module.exports = {
  useRouter,
  push,
  back,
};
