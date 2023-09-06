import axios from "axios";
import useAPIClient from "../useAPIClient";
import { act, renderHook } from "../../rtlHelpers";
import { ErrorBoundary } from "react-error-boundary";

let mockShowBoundary = jest.fn();

jest.mock("axios");
jest.mock("react-error-boundary", () => ({
  // __esModule: true,
  ...jest.requireActual("react-error-boundary"),
  default: jest.fn(() => ({
    ErrorBoundary: jest.fn(() => <div>error</div>),
    useErrorBoundary: jest.fn(() => ({
      showBoundary: mockShowBoundary
    }))
  }))
}));

describe("useAPIClient", () => {
  test("returns state and makeRequest function", () => {
    const { result } = renderHook(() => useAPIClient(), 
      { wrapper: ({ children }) => <ErrorBoundary>{children}</ErrorBoundary> });

    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("error");
    expect(result.current).toHaveProperty("data");
    expect(result.current).toHaveProperty("makeRequest");
  });

  test("makeRequest resolved with data", async () => {
    const taxBracketData = { tax_brackets: [{ min: 0, max: 5000, rate: 0.15 }] }
    axios.mockResolvedValue({ data: taxBracketData });

    const { result } = renderHook(() => useAPIClient(), 
      { wrapper: ({ children }) => <ErrorBoundary>{children}</ErrorBoundary> });

    expect(result.current.data).toBeNull();
    
    await act (async () => result.current.makeRequest({ url: "/test-url" }));

    expect(result.current.data).toBe(taxBracketData);
  }); 
});