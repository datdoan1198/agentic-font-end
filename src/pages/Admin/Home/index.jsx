import React from "react";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import styles from './styles.module.scss';
import Handle from './handle.js';

export default function Home() {
  const {} = Handle();

  return (
    <AdminLayout>
      <div className={styles.homeContainer}>
        <div>Home Page Admin</div>
      </div>
    </AdminLayout>
  )
}
