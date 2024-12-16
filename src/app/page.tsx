import Home from "./portal/_home";
import PortalFooter from "./portal/_components/portal-footer";
import PortalHeader from "./portal/_components/portal-header";
import PortalRequestQuoteFab from "./portal/_components/portal-request-quote-fab";

export default function RootPage() {
  return (
    <>
      <PortalHeader />
      <Home />
      <PortalFooter />

      <PortalRequestQuoteFab />
    </>
  );
}
