// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
ActiveStorage.start()

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded")

  liff.init({
    liffId: "liffのid"
  })
  .then(() => {
    const idToken = liff.getDecodedIDToken();
    console.log(idToken)
    // initializeApp();
  })

  const postFormElm = document.querySelector('#post-form')
  postFormElm.addEventListener('ajax:success', (e) => {
    console.log(e.detail[0])
    // 本来はシリアライザーでうまいこと整形してあげるべき。
    const redirect_url = `https://liff.line.me/liffのid/posts/${e.detail[0].id}`
    // ここでshared target pickerを呼び出す
    liff.shareTargetPicker([{
                'type': 'text',
                'text': redirect_url
            }]).then((res) => {
              if (res) {
                // succeeded to send message in TargetPicker
                liff.closeWindow();
              } else {
                // canceled to send message
                console.log('TargetPicker was closed!')
              }
            }).catch(function (res) {
                alert("失敗したよ")
            });
  })
})