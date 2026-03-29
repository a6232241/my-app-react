import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import List from "./List";
import * as dataUtils from "../../utils/data";
import { act } from "react";

describe("List 組件測試", () => {
  it("初次載入時，應該顯示「點擊開始載入」按鈕", () => {
    render(<List />);
    const button = screen.getByRole("button", { name: /點擊開始載入/i });
    expect(button).toBeInTheDocument();
  });
});

vi.mock("../../utils/data", () => ({
  fetchData: vi.fn(),
}));

describe("List 同步非同步測試", () => {
  it("點擊按鈕後，應該顯示載入中的狀態與API回傳的資料", async () => {
    const mockData = {
      id: 1,
      title: "測試文章標題",
      body: "測試文章內容",
      userId: 1,
    };
    let resolvePromise: (value: unknown) => void;

    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    vi.mocked(dataUtils.fetchData).mockReturnValue(promise);

    render(<List />);

    const button = screen.getByRole("button", { name: /點擊開始載入/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await act(async () => {
      resolvePromise!(mockData);
    });

    await waitFor(
      () => {
        const postItem = screen.getByText(/測試文章標題/i);
        expect(postItem).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    expect(dataUtils.fetchData).toHaveBeenCalled();
  });
});
