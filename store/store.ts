import $axios from "@/http/axios";
import { makeAutoObservable, runInAction } from "mobx";
import { useRouter } from "next/navigation";

enum Status {
  "active",
  "inactive",
}
interface Photo {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: Date;
}
interface Contact {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Company {
  id: string | number;
  contactId: string | number;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: Date;
  };
  type: string[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  photos: Photo[];
}

export class AppStore {
  isAuth: boolean = false;
  companies: Company[] = [];
  //   company: Company | null = null;
  company: Company | null = {
    id: "12",
    contactId: "16",
    name: "Eternal Rest Funeral Home",
    shortName: "ERFH",
    businessEntity: "Partnership",
    contract: {
      no: "1624/2-24",
      issue_date: new Date("2024-03-12T00:00:00Z"),
    },
    type: ["funeral_home", "logistics_services"],
    status: Status.active,
    createdAt: new Date("2024-11-21T08:03:00Z"),
    updatedAt: new Date("2024-11-23T09:30:00Z"),
    photos: [
      {
        name: "7e6034a0bcf8670c10ef4e2cc05d0334.jpg",
        filepath:
          "https://test-task-api.allfuneral.com/7e6034a0bcf8670c10ef4e2cc05d0334.jpg",
        thumbpath:
          "https://test-task-api.allfuneral.com/7e6034a0bcf8670c10ef4e2cc05d0334-thumb.jpg",
        createdAt: new Date("2024-12-17T08:00:00Z"),
      },
      {
        name: "1e534fc26a643695eceb5992f968bcc6.jpg",
        filepath:
          "https://test-task-api.allfuneral.com/1e534fc26a643695eceb5992f968bcc6.jpg",
        thumbpath:
          "https://test-task-api.allfuneral.com/1e534fc26a643695eceb5992f968bcc6-thumb.jpg",
        createdAt: new Date("2024-12-17T08:00:00Z"),
      },
      {
        name: "d93655769ad9ad3922797ef1a78f979f.jpg",
        filepath:
          "https://test-task-api.allfuneral.com/d93655769ad9ad3922797ef1a78f979f.jpg",
        thumbpath:
          "https://test-task-api.allfuneral.com/d93655769ad9ad3922797ef1a78f979f-thumb.jpg",
        createdAt: new Date("2024-12-22T08:00:00Z"),
      },
    ],
  };
  //   contact: Contact | null = null;
  contact: Contact = {
    id: "16",
    lastname: "Rosenberg",
    firstname: "David",
    phone: "17025552345",
    email: "david_rosenberg88@gmail.com",
    createdAt: new Date("2024-11-21T08:03:26.589Z"),
    updatedAt: new Date("2024-11-23T09:30:00Z"),
  };
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAuth(userName: string, router: ReturnType<typeof useRouter>) {
    this.loading = true;
    this.error = null;
    try {
      const res = await $axios.get(`/auth?user=${userName}`);
      if (res.status === 200) {
        const token = res.headers["authorization"];
        if (token && token.startsWith("Bearer ")) {
          const bearerToken = token.split(" ")[1];
          localStorage.setItem("token", bearerToken);
        }
      }
      runInAction(() => {
        this.isAuth = true;
        this.loading = false;
      });
      router.push("/companies");
    } catch (err) {
      runInAction(() => {
        this.error = "Ошибка загрузки пользователей";
        this.loading = false;
      });
    }
  }
  async fetchCompanyWithId(id: number) {
    this.loading = true;
    this.error = null;
    try {
      const res = await $axios.get(`/companies/${id}`);
      if (res.status === 200) {
        runInAction(() => {
          this.company = res.data;
          this.loading = false;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = "Ошибка загрузки компаний";
        this.loading = false;
      });
    }
  }
  async patchCompanyWithId(
    id: number,
    data: {
      name: string;
      shortName: string;
      businessEntity: string;
      contract: {
        no: string;
        issue_date: Date;
      };
    }
  ) {
    this.loading = true;
    this.error = null;
    try {
      const res = await $axios.patch(`/companies/${id}`, data);
      if (res.status === 200) {
        runInAction(() => {
          this.company = res.data;
          this.loading = false;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = "Ошибка обновления компании";
        this.loading = false;
      });
    }
  }
  async deleteCompanyWithId(id: number) {
    this.loading = true;
    this.error = null;
    try {
      const res = await $axios.delete(`/companies/${id}`);
      if (res.status === 200) {
        runInAction(() => {
          this.company = null;
          this.loading = false;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = "Ошибка удаления компании";
        this.loading = false;
      });
    }
  }
  async fetchContactWithId(id: number) {
    this.loading = true;
    this.error = null;
    try {
      const res = await $axios.get(`/contacts/${id}`);
      if (res.status === 200) {
        runInAction(() => {
          this.company = res.data;
          this.loading = false;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = "Ошибка загрузки контактов";
        this.loading = false;
      });
    }
  }
  async patchContactWithId(
    id: number,
    data: {
      lastname: string;
      firstname: string;
      phone: string;
      email: string;
    }
  ) {
    this.loading = true;
    this.error = null;
    try {
      const res = await $axios.patch(`/contacts/${id}`, {
        ...data,
        id,
        createdAt: this.contact.createdAt,
        updatedAt: new Date(),
      });
      if (res.status === 200) {
        runInAction(() => {
          this.contact = res.data;
          this.loading = false;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = "Ошибка обновления контакта";
        this.loading = false;
      });
    }
  }
  async postImg(id: number, img: File) {
    this.loading = true;
    this.error = null;
    const res = await $axios.post(`/companies/${id}/image`, img, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status === 200) {
      runInAction(() => {
        this.company?.photos.push(res.data);
        this.loading = false;
      });
    }
  }
  async deleteImg(id: number, name: string) {
    this.loading = true;
    this.error = null;
    const res = await $axios.delete(`/companies/${id}/image/${name}`);
    if (res.status === 200) {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const appStore = new AppStore();
