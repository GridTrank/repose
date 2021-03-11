
import { mapActions,mapGetters } from 'vuex'
import http from '@/utils/httpUtil.js'
export default {
  name: 'login',
  data() {
    return {
      account:'',
      password:'',
      tip:''
    }
  },
  created() { 
    if(sessionStorage.getItem("isLogin")){
      this.$router.push({
        path:'/home'
      })
    }
  },
  computed: {
    ...mapActions([])
	},
  methods: {
    ...mapActions([
      'upDataUserInfo',
    ]),
    commit(){
      let data={
        user_name:this.account,
        pass_word:this.password
      }
      http.post('/store/login',data,(res=>{
        if(res.code==200){
          this.$message({
            message:'登录成功',
            type:'success'
          })
          sessionStorage.setItem("userInfo",JSON.stringify(res.result))
          sessionStorage.setItem("isLogin",true)
          this.upDataUserInfo(res.result)
          this.$router.push({
            path:'/home'
          })
        }else{
          this.tip='用户名或密码错误'
        }
      }))

    }
  },

  watch: {

  },
  
}
