import { Fetch } from "./axioshelper";
import mockAxios from "axios";

describe("Axios helper Test", () => {
  describe("FETCH", () => {
    it("Fetch - Some ramdom url", async () => {
      await Fetch({
        endpoint: "abc123alksdf.com.br"
      });
    });

    it("Fetch - Should Returns 200", async () => {
      const resp200Mock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 200 };

      mockAxios.get.mockImplementationOnce(() => Promise.resolve(resp));

      await Fetch({
        endpoint: "abc123alksdf.com.br",
        resp200: resp200Mock
      });

      expect(resp200Mock).toHaveBeenCalled();
      expect(resp200Mock).toBeCalledWith(data, resp);
    });

    it("Fetch - Should Returns 204", async () => {
      const resp200Mock = jest.fn();
      const resp204Mock = jest.fn();
      const data = { omg: 1 };
      const resp = { data: data, status: 204 };

      mockAxios.get.mockImplementationOnce(() => Promise.resolve(resp));

      await Fetch({
        endpoint: "abc123alksdf.com.br",
        resp200: resp200Mock,
        resp204: resp204Mock
      });

      expect(resp200Mock).not.toHaveBeenCalled();
      expect(resp204Mock).toHaveBeenCalled();
      expect(resp204Mock).toBeCalledWith(data, resp);
    });
  });
});
