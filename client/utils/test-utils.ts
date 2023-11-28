import { ReactElement } from "react";
import {
  render,
  renderHook as rtlRenderHook,
  RenderHookOptions,
  RenderOptions,
} from "@testing-library/react";
import { AppProviders } from "../providers/app-providers";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AppProviders, ...options });

const customRenderHook = <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: Omit<RenderHookOptions<TProps>, "wrapper">
) => {
  return rtlRenderHook(callback, { wrapper: AppProviders, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
export { customRenderHook as renderHook };

export const mockConsoleError = () => {
  const consoleMock = jest.spyOn(console, "error");
  consoleMock.mockImplementation(() => undefined);
  return consoleMock;
};
