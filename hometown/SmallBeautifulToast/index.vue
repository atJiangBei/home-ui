<template>
<transition name="PaToastFade" >
<div class="small-beautiful-toast"  v-show="show" v-stop>
	<div class="small-beautiful-toast-all">
		<template v-if=" type==='success' || type==='cancel' || type==='warn' || type==='text'">
		  <div>
		  	<i :class="ipStyle" v-if="!(type==='text')"></i>
		  	<p :class="ipStyle"><slot>{{text}}</slot></p>
		  </div>		
		</template>
	</div>
</div>
</transition>
</template>

<script>
export default{
	directives:{
		stop:{
			bind(el){
				el.addEventListener("touchmove",event=>{
					event.preventDefault()
				})
			}
		}
	},
	watch:{
		show(newv,oldv){
			if(newv){
				this.Init()
			}
			
		},
		value (val) {
	      this.show = val
	    }
	},
	computed:{
		ipStyle(){
			return {
				'small-beautiful-toast-success':this.type === 'success',
				'small-beautiful-toast-warn':this.type === 'warn',
				'small-beautiful-toast-cancel':this.type === 'cancel',
				'small-beautiful-toast-text':this.type === 'text',
			}
		},
	},
	props:{
		value:Boolean,
		type:{
			type:String,
			validator(value){
		        return ['success', 'warn', 'cancel', 'text'].indexOf(value) !== -1 || value==''
		     },
		    default:'success'
		},
		time:{
			type:Number,
			default:2000
		},
		text:String,
	},
	created(){
		if(this.value){
			this.show = true;
		};
	},
	data(){
		return{
			timeout:null,
			show:false,
		}
	},
	methods:{
		Init(){
			this.$emit("input",true);
			this.$emit("on-show");
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.$emit("input",false);
				this.$emit("on-hide");
				this.show = false;
				
			},this.time)
		},
	}
}
</script>

<style>
	@import url("../static/css/reset.css");
.PaToastFade-enter-active, .PaToastFade-leave-active {
  transition: opacity .5s;
}
.PaToastFade-enter, .PaToastFade-leave-to {
  opacity: 0;
}
.small-beautiful-toast{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5000;
  width: 100%;
  height: 100%;
}
.small-beautiful-toast .small-beautiful-toast-all{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		margin:auto;
		width: 125px;
		padding-left: 10px;
		padding-right: 10px;
		background: hsla(0,0%,7%,.7);
		border-radius: 5px;
		display: table;
  }
  .small-beautiful-toast .small-beautiful-toast-all >div{
		display: flex;
		align-items: center;
		justify-content: center;
		padding:5px 0;
	}
  .small-beautiful-toast .small-beautiful-toast-all i{
		display: block;
		width: 28px;
		height: 28px;
	}
  .small-beautiful-toast .small-beautiful-toast-all i.small-beautiful-toast-success{
		background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAADPklEQVRoQ92ZvY9NURTF11L4SKh8dEJCSXQIpZKCioqCIFHMJEbNtD6CiUqjRlQSNEJoVLT8ATS+EiQkxJIzzp2ceXPuPfucd9+bd+/rJuecvfcv+9671zpD9Pwn6QqAHyRnHSr7yivJsd0BcMIzzpC81ktgSSsBPABwaKChM70DlrQWwBMA+yNP71yvgCVtBPAUwM4I7CPX8d4AS9oC4DmArRHY167jJH/1AljSDt/ZTRHY9wB2kfzci6+0pH3+nV0Xgf0GYDfJd9Vapzss6aD/Gq+KwP4GcIDky3Cts8CSjvs5u6JGSxwleW9wrZPAks4BuNUgmmZJXoqtdw5Y0mUAFxpg75I8VrfeGeCIVIwxvfDv7Z9OAzdIxZDrrf8if2/yBxPf4YRUrNg++Vn7IWWGJho4IRUrtp9eRb1JwU608EhIxYrt77w+Jh9bYCcWOCEVQ7YpknNW2IkETkjFkO02yTM5sBMHnJCKIdt/q0eqs8AGqVixLVi9XNhFHZZ0EYCzWadJfi0JVnrGIBWr0IusXkm++bEk6TyAqz7ARwAnST4sCZh7xiAVq5BLrF5urvkOD8CGMe4DOEvyS0ng1BmjVKzCRK1eKkds3QHfADBVc3gk3TZKxbCkqNUrBXaPtbvSPNIQoLVuG6ViWEqt1SsC9u/wagDPAOxtCDJ0t41SMSyh0eoVA3vo9QBeAdieCFTUbaNUDFMnrd5QwB56m4fekAiW1e0MqVilNVm9oYE99B7/eK8xBEx2O0MqVunMVs9Q35ItUXso6bD/kNVdkIWBarudIRWreFlWrzVg3+lpANczgi7qdoZUrFJkW72M2ha2Nl4ASHLADtz6c90+BWBz4lYxFm+a5E1rotJ9KWDLjC7NHZ4rsnoliZNXPJIsM7okd3Wm2OqVJE0C+/fZOqNzaxjK6uUmc/tNwB7aOqOtdQxt9ayJwn1mYA+dM6Ob6mnF6o0c2EPnzOhYTa1ZvbEAF87osLbWrN7YgD10k4+uq6VVqzdu4NwZ3brVGyuw77J1Ro/E6o0d2DijR2b1lgU4MaNHavWWDbhmRo/c6i0r8MCMdn9m/VevpPiSM1lKy5JAkrOTGofVs9QzuOcf2L5OPIUlCegAAAAASUVORK5CYII=) no-repeat center;
		background-size: 100%;
	}
  .small-beautiful-toast .small-beautiful-toast-all i.small-beautiful-toast-warn{
			background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEeElEQVRoQ9WaTYwTZRjH///ZLjtttxdXDyoJB0ggXlglyMFEjTc+9KKVBMLOdCCL8mFiZONNxKOwMQaUWKGdCZqI9aYs8WLExIiBKBxIILKEg3pxPXXbmbLuPGZmP9LtdunHvC10Tk1n3v/z/N5n3nnf53lfQsHlGcZan9wCyhYSmyHYBHJVjXRFBNdA/ELIVc7isu44k1HNs10BSadXeYOJ3SDfBbC+LR2RGwDG9f6BL5jNzrSj0TKA7NmTdPv79gNyhODj7RitbSPA3wFIvFg6zULBbUWzaQAZHU24M5VDQY8TeKQVI80+K5ApCI7H+wdOMZstN9OuKQDPstYL/O8BrGlGNPIzgruaYOuAbd9spNUQwMuM7BDwK5DJRmJq78s0fe7Sbfvb++neF8DLGG8KeQqApta5ptV8ihzS887plVqsCOBaxl6AZ5o21cEHCdmv55xsPRN1ATzT3CYagtA9qJ6v9dUn5RX9rHOh9sYygIppbvA1uQJwMEqnish3mjb7dqDh+30fkdwRRQ+Qac3n5tqBvQRADh8e8KaLwWy5IYoxEfkrPl1ew0JhNtCRdLrPTSXuElwdRReCm/pgapgnT1YWdJYAuBnjPZDHIhkJG8tP8ZzzQrWOmzF/BLHkv7bsiByN550PlgGU9+1eTb//NoCBtoSrGwkuxfP2ix0BACqizaxLnPnyz0B/MQJexjgh5DuRnQ8D0FEAUGRczztHFgEknR70UslgPZLqBQAARR3ak8zlimEE5iesT5U434UIhD0vciCY4EKAcsb8ncRwLwEEuUUibz9NGRkZ8mLalDLnuxSBwIweqzzGimW86oPf9CKABnmNXsY4LmQ4opVdHf4KLc4BIuN0LWMC4FZlznfxFQLkYgDwB8B1PQkgMsmyZfxD8NFeBAhSULoZowwy3osAEHEDgEqdGk40ni4NYojcYzljTJEciuZxTesuAYjIv0EEboNc24sAENyhmzEvgNimFKBePmAZlwA+r9SOYIKeZX4owJhK4Y5lZDVOUuQEy6aZpoavVQLMaclFcvat8Jcf+1h9lANdvN6ZxZz63qirqLNvaG45bZnXCGzskl0lZgS4nsjZw3MJjWkeEA2fKFHuksiShEZ5Stl5iKJeLD3BQmG6M0n93CD+D8D5eZadAGOquJYl9eE4UFpWkXvi46WE4/wcahvGc9Twg6IlS/2ySmDItcz3ARyN2lMi+C2RtzdV65Qt4yrBJf+1aedYPGcHfobX8tJiqXi97T2vedEOTmS39GRq44qlxcC+quKu+omsieLuQlgeyvK6j5d1256ofe16YoMDkH3xnHO23ph56LeYALwRz9mfrzTgG2/y7TW2i4/zXd/kEylRw856uzLVMA0BwqVG17dZZZLs267ncrcafWqbAgjn1WCHPqYdBDGmvIqx8Pnt1EZ3dS/Mg4zOg6g9ajAz+xnPnSs16vWWX6F6guFhj1RyFwRjIJ5qxejisw/isEc9R6uP2wB8lpBnlq17BJ4gPG5zGT6uaCK/qjhu8z/MFzY76DZiaAAAAABJRU5ErkJggg==) no-repeat center;
			background-size: 100%;
		}
  .small-beautiful-toast .small-beautiful-toast-all i.small-beautiful-toast-cancel{
			background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEbUlEQVRoQ92ajXEUMQyF5QogFQAVABUAFRAqIFQAVEBSAVABpAKgApIKSCoAKgAqEPPtyBmdb23Luxtg0MxNMrdrW096+rF9STYQVb0pIo9F5LaIPLS//O/lm4jwObO/n1JKP9cun5ZOYEo/FZEjEbm3cJ4LEXkvIqdLwQwDUFUs+9wUx/JbCJ4AyNuUEl4KyxAAVX0lIi9EpKb4pYhgVZRAKf5H8BBjAM//dysaMuZNSukkiiAEQFVZ9F2FKp9E5COfKA2MfociwofYKQXgTyLe6AJQVTj+esbqpyJyHFmkZU2j5LGIEE9e8MbLlBLUqkoTgCmP5b1Ak6OUUqZH1NvN98zLKFvS61kLRBVARXmCjBi4NlHVN5Yk/BpVELMAKso3LbElosr6xASxtiN7AMyVnwvOzw7eUulyLlUlwD+474mJ+2XMzQH4UmSbP2b5GRAkEB+DFyml+/69HQCqSjYg12e5ds73vDgTEycpJfSc5AqApTOsn4vUZUppaYvQ02vouaqS8XJ22qGSB1BGP3zbNFUOae1etrjEuFmuvDABsMr41Vmf5gr+VcUmpcDRNlBwhjpLW5PxtBeMbxpLVakRudix1h3WzADI7UyWhYfNpkpVaYsf2AAWfxQFYcqT6TJFz1NKtOEtgwEUI2eZkksG4DMPfToprCmFRXg3BGJGecZ2PW5MoQ7k3mnKSMkm/FEiCwAg2PGCL/1NEBXlaU0eRrw3U+AOAFDm2oPIZC52QiDWKu/W88Z+AgCffYZTpynWBLGF8pkRRUo9AYAPxhAXS3q1QNi7PmD5KkybmbV8NjoHAJGdN+A7Va4XB/55AwSv+YK4WHmjke8WvgFARwO4BqwCwr++SnkDsJPySwDkcii1WBogVitvAKgXUHKS6wJQcj5cJ3qWU9UmgFWtcyXbeJ1Cxa4FQlX3KETLcMsGrQ3iuWzD1OFiF/CAD+LvW6bR2VRpCoWKXU95i4G9NOoL2d6OpzdppEhFil1vnfxcVX3fNhWyta1EqEhtAWKmb5taCZqypc1cSHlnveEGsCiW+8Y2Xvkt29J2OpTnK54ItTCqisHyvmHq27ba0ISUb3hi9YYG15JOb9giXYvYlpIEwLgX0Ra8AMF4+jDGj2wpfzHuaktpNPqXN/U71VdEdjf1BgBLYIXsheGUGk2Fo+8VqRPr38t79v/nYMtx02ckvl7VH41au5M293aMtcNdSn+mEnP+jcPdMufvUCcD/f+O1x2VSgvwiAu4l2to0RurqhywlZcoYxccHRDECBNuem5qGxWULw+Ul10xORCc0tHC+pjgMd+Rj4fudUsP2Kk4R/rlWSyc5y5u71bGz9G9pXQ1gonm7nenK1YRCf90wP00AaXnzkRpTQ4jxgkBcN5gNwQ/S2/kV6BV5KK7du+A1YmzqwuMXswMAXDeAATWqwHprVs+nxSHlhGrD1NoThujASD41H460AMCVVA8fMtfTjjsgQYYuAw18s9t8kFBHvLd/dwGmp2NdrBza/8G6HOdIECf1pgAAAAASUVORK5CYII=) no-repeat center;
			background-size: 100%;
		}
  .small-beautiful-toast .small-beautiful-toast-all i.small-beautiful-toast-text{
		display: none;
	}
  .small-beautiful-toast .small-beautiful-toast-all p{
		flex:1;
		line-height: 24px;
		font-size: 18px;
		text-align: center;
		color: #fff;
	}
  .small-beautiful-toast .small-beautiful-toast-all p.small-beautiful-toast-success{
		color: #fff;
	}
  .small-beautiful-toast .small-beautiful-toast-all p.small-beautiful-toast-warn{
		color: #f76260;
	}
  .small-beautiful-toast .small-beautiful-toast-all p.small-beautiful-toast-cancel{
		color: #fff;
	}
</style>