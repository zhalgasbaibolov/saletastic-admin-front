
<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card p-4">
            <h1>Twilio App</h1>
            <form @submit.prevent="sendMessage">
              <div class="form-group">
                <label for="Number">Enter Phone Number</label>
                <input
                  v-model="message.to"
                  type="text"
                  placeholder="080********"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label for="Number">Enter Message</label>
                <textarea
                    id
                  v-model="message.message"
                  class="form-control"
                  cols="30"
                  rows="10"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                <span
                  role="status"
                  aria-hidden="true"
                ></span>Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";
export default {
  data() {
    return {
      message: {
        to: "",
        message: ""
      },
    };
  },
  methods: {
    async sendMessage() {
      try {
        await axios.post(
          "/twilioapi/send/sms",
          this.message,
          this.message = {
            to: "",
            message: ""
          },
        );
      } catch (err) {
        console.log(err);
      }
    }
}
}
</script>