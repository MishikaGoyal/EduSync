export async function POST(req) {
  const { loginId, password, role } = await req.json();
}
