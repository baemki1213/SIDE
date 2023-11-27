const useRouter = jest.fn();
const push = jest.fn();

useRouter.mockImplementation(() => ({
  push,
}));

module.exports = {
  useRouter,
  push,
};
