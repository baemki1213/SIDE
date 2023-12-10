const reactRedux = jest.requireActual("react-redux");

const mockUseSelector = jest.fn();
mockUseSelector.mockImplementation(callback =>
  callback({ auth: { isLogin: true } })
);

module.exports = {
  ...reactRedux,
  useSelector: mockUseSelector,
};
