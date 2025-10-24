import {
  Page,
  Layout,

} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import Landing from "./Landing";

// import "@shopify/polaris/build/esm/styles.css";


export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title={t("Split-spur")} />
      <Layout>
        <Layout.Section>
         <Landing />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
