import Header from "@/lib/ui/header";
import styles from "./page.module.scss";
import Footer from "@/lib/ui/footer";
import { OpenSansSemiBold } from "@/lib/typography";
export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <section>
        <h2 className={OpenSansSemiBold.className}>Next.js & GraphQL Boiler Template: Seamless, Scalable, and Lightning-Fast API Integration</h2>
      </section>
      <Footer />
    </div>
  );
}
