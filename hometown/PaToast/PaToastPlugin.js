import ToastComponent from './PaToast.vue'

let $vm,watcher
const plugin = {
  install (vue, pluginOptions = {}) {
    const Toast = vue.extend(ToastComponent)
		 if (!$vm) {
      $vm = new Toast({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
   }


    const toast = {
      show (options = {}) {
      	 watcher && watcher();
      	 for (let i in Object.assign({},pluginOptions,options)) {
      				if(i!='show'){
      					$vm[i] = options[i];
      				}
      			}
      	watcher = $vm.$watch('show', (val) => {
      			val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        $vm.show = true;
      },
      text (text) {
        this.show({
          type: 'text',
          text
        })
      },
      hide () {
        $vm.show = false;
      },
      isVisible () {
       
      }
    }

    // all Vux's plugins are included in this.$vux
    if (!vue.$pa) {
      vue.$pa = {
        toast
      }
    } else {
      vue.$pa.toast = toast
    }

    vue.mixin({
      created: function () {
        this.$pa = vue.$pa
      }
    })
  }
}

export default plugin
