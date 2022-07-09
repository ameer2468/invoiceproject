import axios from "axios";

const api = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
test("get invoices", async () => {
  await axios
    .get(`${api}/invoices`, {
      headers: {
        "x-api-key": apiKey,
      },
      params: {
        from: "Ameer",
      },
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.data[0]).toEqual(
        expect.objectContaining({
          from: "Ameer",
        })
      );
    });
});

test("get an invoice", async () => {
  await axios
    .get(`${api}/invoice`, {
      headers: {
        "x-api-key": apiKey,
      },
      params: {
        id: "324345756",
      },
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.invoice[0]).toEqual(
        expect.objectContaining({
          id: "324345756",
        })
      );
    });
});
