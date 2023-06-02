import { createApp } from "vue"
import App from "./App.vue"

createApp(App).mount("#app")

const fn = () => {
  console.log(123)
}
fn()
