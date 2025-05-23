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
  company: Company | null = null;
  contact: Contact | null = null;
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
      this.fetchContactWithId(Number(res.data.contactId));
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
          this.contact = res.data;
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
        createdAt: this.contact?.createdAt,
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
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await $axios.post(`/companies/${id}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        runInAction(() => {
          this.company?.photos.push(res.data);
          this.loading = false;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = "Ошибка загрузки фото";
        this.loading = false;
      });
    }
  }
  async deleteImg(id: number, name: string) {
    this.loading = true;
    this.error = null;
    try {
      const res = await $axios.delete(`/companies/${id}/image/${name}`);
      if (res.status === 200) {
        runInAction(() => {
          this.loading = false;
          if (this.company?.photos) {
            const indexToRemove = this.company.photos.findIndex(
              (photo) => photo.name === name
            );
            if (indexToRemove !== -1) {
              this.company.photos.splice(indexToRemove, 1);
            }
          }
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = "Ошибка удаления фото";
        this.loading = false;
      });
    }
  }
}

export const appStore = new AppStore();
