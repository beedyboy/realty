import { observable, action, computed } from "mobx";
import api from "../utils/APIService";
import Storage from "../utils/Storage";
import { NotificationManager } from "react-notifications";

class ProductStore {
  @observable error = false;
  @observable filter = "ALL";
  @observable message = "";
  @observable loading = false;
  @observable close = false;
  @observable saved = false;
  @observable sending = false;
  @observable houses = [];
  @observable lands = [];
  @observable latest = [];
  @observable product = [];
  @observable sales = [];
  @observable rents = [];

  @action toggleClose = () => {
    this.close = false;
  };
  @action setFilter = (data) => {
    this.filter = data;
  };

  @action refreshForm = () => {
    console.log("called");
    this.saved = false;
  };
  @action getHouses = () => {
    try {
      this.loading = true;
      api
        .get("house/save")
        .then((res) => {
          if (res.data.success === true) {
            this.houses = res.data.data;
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log("getHouses", err.code);
          console.log("getHouses", err.message);
          console.log("getHouses", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };

  @action getLands = () => {
    try {
      this.loading = true;
      api
        .get("land/save")
        .then((res) => {
          if (res.data.success === true) {
            this.lands = res.data.data;
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log("getLands", err.code);
          console.log("getLands", err.message);
          console.log("getLands", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };

  @action saveHouse = (formData) => {
    try {
      this.sending = true;
      api
        .post("house/save", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.sending = false;
          if (res.data.success === false) {
            NotificationManager.error(res.data.message);
          } else if (res.data.success === true) {
            this.saved = true;
            this.getHouses();
            NotificationManager.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log("saveHouse", err.code);
          console.log("saveHouse", err.message);
          console.log("saveHouse", err.stack);
        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  @action saveLand = (formData) => {
    try {
      this.sending = true;
      api
        .post("land/save", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.sending = false;
          if (res.data.success === false) {
            NotificationManager.error(res.data.message);
          } else if (res.data.success === true) {
            this.saved = true;
            this.getLands();
            NotificationManager.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log("saveLand", err.code);
          console.log("saveLand", err.message);
          console.log("saveLand", err.stack);
        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  
  @action getSales = (formData) => {
    try {
      this.loading = true;
      api
        .post("search", formData)
        .then((res) => {
          this.loading = false;
          if (res.data.success === true) {
            this.sales = res.data.data;
          } 
        })
        .catch((err) => {
          console.log("getSales", err.code);
          console.log("getSales", err.message);
          console.log("getSales", err.stack);
        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  
  @action getRent = (formData) => {
    try {
      this.loading = true;
      api
        .post("search", formData)
        .then((res) => {
          this.loading = false;
          if (res.data.success === true) {
            this.rents = res.data.data;
          } 
        })
        .catch((err) => {
          console.log("getRent", err.code);
          console.log("getRent", err.message);
          console.log("getRent", err.stack);
        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  @action toggleProduct = (data) => {
    api.post("admin/toggle", data).then((res) => {
      if (res.data.status === 200) {
        this.getHouses();
      }
    });
  };
  @action removeProduct = (id) => {
    api.delete("admin/" + id).then((res) => {
      if (res.status === 200) {
        this.getHouses();
        this.message = res.message;
        //  return <Toast opens={true} type="success" message={res.message} />;
        // Toast(true, 'success',  res.message );
      }
    });
  };
  @action findLatest = () => {
    try {
      this.loading = true;
      api
        .get("latest")
        .then((res) => {
          this.loading = false;
          if (res.data.success === true) {
            console.log(res.data.data);
            this.latest = res.data.data;
          }
        })
        .catch((err) => {
          console.log("findLatest", err.code);
          console.log("findLatest", err.message);
          console.log("findLatest", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };

  @action removeProduct = (id) => {
    api
      .delete("admin/" + id)
      .then((res) => {
        if (res.status === 200) {
          this.getHouses();
          Beedy("success", res.data.message);
        }
      })
      .catch((err) => {
        console.log("remove_product", err.code);
        console.log("remove_product", err.message);
        console.log("remove_product", err.stack);
      });
  };
  @action getProductById = (id) => {
    try {
      this.loading = true;
      api
        .get(`products/${id}`)
        .then((res) => {
          this.loading = false;
          if (res.data.success === true) {
            this.product = res.data.data;
          }
        })
        .catch((err) => {
          console.log("product_by_id", err.code);
          console.log("product_by_id", err.message);
          console.log("product_by_id", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };

  @computed get filteredProduct() {
    switch (this.filter) {
      case "ALL":
        return this.latest;
      case "Active":
        return this.latest.filter((s) => s.status === "Active");
      case "Inactive":
        return this.latest.filter((s) => s.status === "Inactive");
      case "Deleted":
        return this.latest.filter((s) => s.section === "Deleted");

      default:
        return this.latest;
    }
  }

  @computed get info() {
    return {
      total: this.latest.length,
      status: this.latest.filter((cat) => cat.status).length,
    };
  }
}

export default ProductStore;
