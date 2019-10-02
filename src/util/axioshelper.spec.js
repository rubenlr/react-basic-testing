import { Fetch } from "./axioshelper";
import mockAxios from "axios";

describe("Axios helper Test", () => {
  describe("FETCH", () => {
    it("Fetch - Should Returns 200 Correcly", async () => {
      const resp200Mock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 200 };

      mockAxios.request.mockImplementationOnce(() => Promise.resolve(resp));

      await Fetch({
        url: "abc123alksdf.com.br",
        resp200: resp200Mock
      });

      expect(resp200Mock).toHaveBeenCalled();
      expect(resp200Mock).toBeCalledWith(data, resp);
    });

    it("Fetch - Should Returns 204 Correcly", async () => {
      const resp200Mock = jest.fn();
      const resp204Mock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 204 };

      mockAxios.request.mockImplementationOnce(() => Promise.resolve(resp));

      await Fetch({
        url: "abc123alksdf.com.br",
        resp200: resp200Mock,
        resp204: resp204Mock
      });

      expect(resp200Mock).not.toHaveBeenCalled();
      expect(resp204Mock).toHaveBeenCalled();
      expect(resp204Mock).toBeCalledWith(data, resp);
    });

    it("Fetch - Should Returns 20X Correcly", async () => {
      const resp200Mock = jest.fn();
      const resp204Mock = jest.fn();
      const resp20XMock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 205 };

      mockAxios.request.mockImplementationOnce(() => Promise.resolve(resp));

      await Fetch({
        url: "abc123alksdf.com.br",
        resp200: resp200Mock,
        resp204: resp204Mock,
        resp20X: resp20XMock
      });

      expect(resp200Mock).not.toHaveBeenCalled();
      expect(resp204Mock).not.toHaveBeenCalled();
      expect(resp20XMock).toHaveBeenCalled();
      expect(resp20XMock).toBeCalledWith(data, resp);
    });

    it("Fetch - Should Returns 400 and 40X Correcly", async () => {
      const resp400Mock = jest.fn();
      const resp403Mock = jest.fn();
      const resp404Mock = jest.fn();
      const resp40XMock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 400 };

      mockAxios.request.mockImplementationOnce(() => Promise.reject(resp));

      await Fetch({
        url: "abc123alksdf.com.br",
        error400: resp400Mock,
        error403: resp403Mock,
        error404: resp404Mock,
        error40X: resp40XMock
      });

      expect(resp400Mock).toHaveBeenCalled();
      expect(resp400Mock).toBeCalledWith(data, resp);
      expect(resp403Mock).not.toHaveBeenCalled();
      expect(resp404Mock).not.toHaveBeenCalled();
      expect(resp40XMock).toHaveBeenCalled();
      expect(resp40XMock).toBeCalledWith(data, resp);
    });

    it("Fetch - Should Returns 403 and 40X Correcly", async () => {
      const resp400Mock = jest.fn();
      const resp403Mock = jest.fn();
      const resp404Mock = jest.fn();
      const resp40XMock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 403 };

      mockAxios.request.mockImplementationOnce(() => Promise.reject(resp));

      await Fetch({
        url: "abc123alksdf.com.br",
        error400: resp400Mock,
        error403: resp403Mock,
        error404: resp404Mock,
        error40X: resp40XMock
      });

      expect(resp400Mock).not.toHaveBeenCalled();
      expect(resp403Mock).toHaveBeenCalled();
      expect(resp403Mock).toBeCalledWith(data, resp);
      expect(resp404Mock).not.toHaveBeenCalled();
      expect(resp40XMock).toHaveBeenCalled();
      expect(resp40XMock).toBeCalledWith(data, resp);
    });

    it("Fetch - Should Returns 404 and 40X Correcly", async () => {
      const resp400Mock = jest.fn();
      const resp403Mock = jest.fn();
      const resp404Mock = jest.fn();
      const resp40XMock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 404 };

      mockAxios.request.mockImplementationOnce(() => Promise.reject(resp));

      await Fetch({
        url: "abc123alksdf.com.br",
        error400: resp400Mock,
        error403: resp403Mock,
        error404: resp404Mock,
        error40X: resp40XMock
      });

      expect(resp400Mock).not.toHaveBeenCalled();
      expect(resp403Mock).not.toHaveBeenCalled();
      expect(resp404Mock).toHaveBeenCalled();
      expect(resp404Mock).toBeCalledWith(data, resp);
      expect(resp40XMock).toHaveBeenCalled();
      expect(resp40XMock).toBeCalledWith(data, resp);
    });

    it("Fetch - Should Returns 500 Correcly", async () => {
      const resp400Mock = jest.fn();
      const resp403Mock = jest.fn();
      const resp404Mock = jest.fn();
      const resp40XMock = jest.fn();
      const resp500Mock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 500 };

      mockAxios.request.mockImplementationOnce(() => Promise.reject(resp));

      await Fetch({
        url: "abc123alksdf.com.br",
        error400: resp400Mock,
        error403: resp403Mock,
        error404: resp404Mock,
        error40X: resp40XMock,
        error500: resp500Mock
      });

      expect(resp400Mock).not.toHaveBeenCalled();
      expect(resp403Mock).not.toHaveBeenCalled();
      expect(resp404Mock).not.toHaveBeenCalled();
      expect(resp40XMock).not.toHaveBeenCalled();
      expect(resp500Mock).toHaveBeenCalled();
      expect(resp500Mock).toBeCalledWith(data, resp);
    });

    it("Fetch - Should aways use begin/end on every call", async () => {
      const beginLoadingMock = jest.fn();
      const endLoadingMock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 205 };

      mockAxios.request.mockImplementationOnce(() => Promise.resolve(resp));

      await Fetch({
        url: "abc123alksdf.com.br",
        beginLoading: beginLoadingMock,
        endLoading: endLoadingMock
      });

      expect(beginLoadingMock).toHaveBeenCalled();
      expect(endLoadingMock).toHaveBeenCalled();
    });

    it("Fetch - Should Pass Parameters Correctly to Axios GET", async () => {
      const getFn = jest.fn(() => Promise.resolve(resp));
      const resp = { data: { omg: 1 }, status: 205 };

      mockAxios.request.mockImplementationOnce(getFn);

      const params = {
        url: "abc123alksdf.com.br"
      };
      await Fetch(params);

      expect(getFn).toHaveBeenCalled();
      expect(getFn).toBeCalledWith(expect.objectContaining(params));
    });

    it("Fetch - Should Pass Parameters Correctly default header", async () => {
      const getFn = jest.fn(() => Promise.resolve(resp));
      const resp = { data: { omg: 1 }, status: 205 };

      mockAxios.request.mockImplementationOnce(getFn);

      await Fetch({
        url: "abc123alksdf.com.br"
      });

      expect(getFn).toHaveBeenCalled();
      expect(getFn).toBeCalledWith(
        expect.objectContaining({
          headers: {
            Accept: "application/json, */*",
            "Content-type": "application/json"
          },
          method: "GET"
        })
      );
    });
  });
});
