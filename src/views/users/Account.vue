<template>
  <div>
    <div>
      <app-header></app-header>
      <app-sidebar></app-sidebar>
    </div>
    <div class="page-container">
      <title-bar title="User Profile" :isShow="false"></title-bar>
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <div class="card">
                  <div class="user_title">
                    <label for="image" style="cursor:pointer;">
                      <img :src="avatar" name="aboutme" class="img-circle">
                    </label>
                  </div>
                  <div class="card-footer" style="font-size:12px">
                    <input type="file" name="image" hidden id="image" ref="image" @change="changePhoto"
                      accept="images/*">
                  </div>
                </div>
                <div class="card">
                  <div class="tile p-0">
                    <ul class="nav flex-column nav-tabs user-tabs">
                      <li class="nav-item">
                        <a class="nav-link active" href="#home" data-toggle="tab">
                          <i class="fa fa-user-o"></i> User Information
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#password-tab" data-toggle="tab">
                          <i class="fa fa-key"></i> Change Password
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="card">
                  <div class="card-body">
                    <div class="tab-content pl-3 p-1" id="myTabContent">
                      <div class="tab-pane fade show active" id="home">
                        <div>
                          <div class="form-group">
                            <label for="firstname" class=" form-control-label">Full Name</label>
                            <input type="text" v-model="fullname" id="fullname" placeholder="Enter your Full Name"
                              class="form-control">
                          </div>
                          <div class="form-group">
                            <label for="username" class=" form-control-label">Username</label>
                            <input type="text" id="username" v-model="username" placeholder="Enter Username"
                              class="form-control">
                          </div>
                          <div class="form-group">
                            <label for="phone" class=" form-control-label">Phone</label>
                            <input type="text" v-model="phone" id="phone" placeholder="Enter your Phone"
                              class="form-control">
                          </div>
                          <div class="form-group">
                            <label for="userType" class=" form-control-label">User Type</label>
                            <select name="userType" v-model="role" class="form-control" id="userType">
                              <option disabled selected hidden>Choose a drink</option>
                              <option :value="0">ADMIN</option>
                              <option :value="1">AUTHOR</option>
                              <option :value="2">USER</option>
                            </select>
                          </div>

                          <div class="form-group">
                            <label for="email" class=" form-control-label">Email</label>
                            <input type="email" id="email" v-model="email" placeholder="Enter Your Email"
                              class="form-control">
                          </div>
                          <div class="form-group">
                            <label for="bio" class=" form-control-label">Bio</label>
                            <textarea type="bio" rows="10" id="bio" v-model="bio" placeholder="Enter Your Bio"
                              class="form-control">
                            </textarea>
                          </div>
                          <div>
                            <button class="btn btn-primary btn-sm" @click="onSave">
                              <i class="fa fa-dot-circle-o"></i> Submit
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="password-tab">
                        <div>
                          <div class="form-group">
                            <label for="password" class=" form-control-label">Password</label>
                            <input type="password" v-model="password" id="password" placeholder="Enter your Password"
                              class="form-control">
                          </div>
                          <div class="form-group">
                            <label for="password_confirmation" class=" form-control-label">Confirm
                              Password</label>
                            <input type="password" v-model="password_confirmation" id="password_confirmation"
                              placeholder="Confirm Your Confirm Password" class="form-control">
                          </div>
                          <div>
                            <button class="btn btn-primary btn-sm" @click="onSavePassword">
                              <i class="fa fa-dot-circle-o"></i> Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import TitleBar from '@/components/TitleBar';
  import AppHeader from '@/partials/AppHeader';
  import AppSidebar from '@/partials/AppSidebar';
  import GET_USER from '@/graphql/queries/loginedUser.gql';
  import UPDATE_USER_PROFILE from '@/graphql/mutations/updateUser.gql';
  import UPDATE_USER_PASSWORD from '@/graphql/mutations/updateUserPassword.gql';
  import UPLOAD_AVATAR from '@/graphql/mutations/uploadAvatar.gql';

  export default {
    data() {
      return {
        fullname: "",
        email: "",
        username: "",
        phone: "",
        bio: "",
        role: 0,
        password: "",
        password_confirmation: "",
        avatar: ''
      }
    },
    created() {
          this.fullname = this.$store.getters.getUser.fullname;
          this.email = this.$store.getters.getUser.email;
          this.username = this.$store.getters.getUser.username;
          this.phone = this.$store.getters.getUser.phone;
          this.bio = this.$store.getters.getUser.bio;
          this.role = this.$store.getters.getUser.role;
          this.avatar = this.$store.getters.getUser.avatar != null ? 'http://blog_api.test/storage/uploads/' + this.$store.getters.getUser.avatar : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R';
    },
    methods: {
      changePhoto(e) {
        const file = e.target.files[0];

        this.avatar = URL.createObjectURL(file);

        this.$apollo.mutate({
          mutation: UPLOAD_AVATAR,
          variables:{
            id: this.$store.getters.getUser.id,
            avatar: file
          }
        })
        .then(({data}) => {
            this.$store.dispatch('storeUserData',data.user);
        });

      },
      onSavePassword() {
        this.$apollo.mutate({
            mutation: UPDATE_USER_PASSWORD,
            variables: {
              id: this.$store.getters.getUser.id,
              password: this.password,
              password_confirmation: this.password_confirmation,
            }
          })
          .then((res) => {
            this.$toast.success('User Password Updated Successfully', 'OK');
            this.password_confirmation = this.password = "";
          })
          .catch(e => {
            this.$toast.error(e, 'Opps!');
          });
      },
      onSave() {
        this.$apollo.mutate({
            mutation: UPDATE_USER_PROFILE,
            variables: {
              id: this.$store.getters.getUser.id,
              fullname: this.fullname,
              username: this.username,
              phone: this.phone,
              email: this.email,
              bio: this.bio,
              role: this.role,
            }
          })
          .then(({data}) => {
            this.$store.dispatch('storeUserData',data.user);
            this.$toast.success('User Profile Updated Successfully', 'OK');
          })
          .catch(e => {
            this.$toast.error(e, 'Opps!');
          });;
      }

    },
    components: {
      TitleBar,
      AppSidebar,
      AppHeader
    },
  }
</script>


<style scoped>

a{
  color: #555;
}
.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{
  color: #4272d7;
}
a:hover{
  color: #4272d7;
}

</style>