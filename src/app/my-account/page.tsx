// src/app/my-account/page.tsx
import AppShell from "@/components/AppShell";

export default function MyAccountPage() {
  return (
    <AppShell>
      <div className="container">
        <div className="row mt-3 mb-3 justify-content-lg-center">
          <div
            className="col-lg-6 d-flex align-items-center justify-content-center"
            style={{ minHeight: 450 }}
          >
            <div className="mt-4 mt-lg-0">
              <h1 className="h1">
                <strong>My account</strong>
              </h1>
              <h2 className="h2">
                <strong>HAVE FUN!</strong> you are suscribed
              </h2>
              <p>To unsubscribe, send EXIT to XXXX</p>
            </div>
          </div>

          <div className="col-lg-6">
            <img
              src="/images/hero_top.svg"
              width="100%"
              className="img-fluid"
              alt=""
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
