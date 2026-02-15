import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <h1>顧客一覧</h1>
      <Link href="/customers/new">
        <button style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}>
          + 顧客を追加
        </button>
      </Link>
      {customers.length === 0 ? (
        <p>顧客がまだ登録されていません。</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "0.5rem" }}>ID</th>
              <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "0.5rem" }}>名前</th>
              <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "0.5rem" }}>作成日時</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>{customer.id}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>{customer.name}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>
                  {new Date(customer.createdAt).toLocaleString("ja-JP")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
