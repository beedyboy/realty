import { observable, action, computed } from "mobx";
import api from "../utils/APIService";
import Storage from "../utils/Storage";
import { NotificationManager } from "react-notifications";
class StaffStore {
  // constructor(){
  //   this.getStaff()
  // }
  @observable error = null;
  @observable close = false;
  @observable sending = false;
  @observable loading = false;
  @observable emailExist = false;
  @observable users = [];
  @observable profiles = [];

  @action toggleClose = () => {
    this.close = false;
  };

  @action getStaff = () => {
    try {
      api
        .get("admins/admin")
        .then((res) => {
          if (res.data.success === true) {
            this.users = res.data.data;
          }
        })
        .catch((err) => {
          console.log("getStaff", err.code);
          console.log("getStaff", err.message);
          console.log("getStaff", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };

  @action confirmEmail = (data) => {
    try {
      api
        .get(`admins/${data}`)
        .then((res) => {
          this.emailExist = res.data.exist;
        })
        .catch((err) => {
          console.log("confirmEmail", err.code);
          console.log("confirmEmail", err.message);
          console.log("confirmEmail", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };

  @action createStaff = (data) => {
    try {
      this.sending = true;
      api
        .post("admins/admin", data)
        .then((res) => {
          this.sending = false;
          if (res.data.success === false) {
            Storage.logout();
          } else if (res.data.success === true) {
            this.close = true;
            this.getStaff();
            NotificationManager.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log("createStaff", err.code);
          console.log("createStaff", err.message);
          console.log("createStaff", err.stack);
        });
    } catch (err) {
      if (err.response.success === false) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  @action updateStaff = (data) => {
    try {
      this.sending = true;
      api
        .put("admins/admin", data)
        .then((res) => {
          this.sending = false;
          if (res.data.success === false) {
            Storage.logout();
          } else if (res.data.success === true) {
            this.close = true;
            this.getStaff();
            NotificationManager.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log("updateStaff", err.code);
          console.log("updateStaff", err.message);
          console.log("updateStaff", err.stack);
        });
    } catch (err) {
      if (err.response.success === false) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  @action toggleStaff = (data) => {
    api.post("staff/toggle", data).then((res) => {
      if (res.data.success === true) {
        this.getStaff();
      }
    });
  };

  @action removeStaff = (id) => {
    api.delete("staff/" + id).then((res) => {
      if (res.success === true) {
        this.getStaff();
        this.message = res.message;
      }
    });
  };
  @computed get info() {
    return Object.keys(this.users || {}).map((key) => ({ ...this.users }));
  }
}
export default StaffStore;
