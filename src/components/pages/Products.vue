<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" data-toggle="modal" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="120">是否啟用</th> 
          <th width="120">編輯</th>
          <th width="120">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="item.id">
          <td>{{ item.category}}</td>
          <td>{{ item.title}}</td>
          <td>{{ item.origin_price}}</td>
          <td>{{ item.price}}</td>

          <td>
            <span v-if="item.is_enabled" class="text-succeess">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)"> 編輯</button>     
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="delProductModal(item)"> 刪除</button>     
          </td>

        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
          aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>新增產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="image">輸入圖片網址</label>
                      <input type="text" class="form-control" id="image"
                         :placeholder="tempProducts.title">
                    </div>
                    <div class="form-group">
                      <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin"></i>
                      </label>
                      <input type="file" id="customFile" class="form-control"
                        ref="files" @change="uploadFile">
                    </div>
                    <img class="img-fluid" :src="tempProducts.imageUrl" alt="">
                  </div>
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label for="title">標題</label>
                      <input type="text" class="form-control" id="title"
                        v-model="tempProducts.title"
                        placeholder="請輸入標題">
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category"
                          v-model="tempProducts.category"
                          placeholder="請輸入分類">
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit"
                          v-model="tempProducts.unit"
                          placeholder="請輸入單位">
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price"
                          v-model="tempProducts.origin_price"
                          placeholder="請輸入原價">
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price"
                          v-model="tempProducts.price"
                          placeholder="請輸入售價">
                      </div>
                    </div>
                    <hr>

                    <div class="form-group">
                      <label for="description">產品描述</label>
                      <textarea type="text" class="form-control" id="description"
                        v-model="tempProducts.description"
                        placeholder="請輸入產品描述"></textarea>
                    </div>
                    <div class="form-group">
                      <label for="content">說明內容</label>
                      <textarea type="text" class="form-control" id="content"
                        v-model="tempProducts.content"
                        placeholder="請輸入產品說明內容"></textarea>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                          v-model="tempProducts.is_enabled"
                          :true-value="1"
                          :false-value="0"
                          id="is_enabled">
                        <label class="form-check-label" for="is_enabled">
                          是否啟用
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
              </div>
            </div>
          </div>
        </div>

      <!-- 刪除 model -->
      <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除 <strong class="text-danger">{{ tempProducts.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-danger"
                @click.prevent="delProduct()"
                >確認刪除</button>
            </div>
          </div>
        </div>
      </div>     


  </div>
</template>



<script>
import $ from 'jquery';

export default {
  data(){
    return {
      products: [],
      tempProducts:{},
      isNew: false
    }
  },
  methods: {
    getProducts(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;
      });
    },
    openModal(isNew, item){
      if(isNew){
        this.tempProducts = {};
        this.isNew = true
      }else{
        this.tempProducts = Object.assign({}, item);
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    updateProduct(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';

      const vm = this;
      if(!vm.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProducts.id}`; 
        httpMethod = 'put'
      }

      this.$http[httpMethod](api, {data: vm.tempProducts}).then((response) => {
        console.log(response.data);
        // vm.products = response.data.products;
        if(response.data.success){
          $('#productModal').modal('hide');
          vm.getProducts();
        }else{
          console.log('新增失敗');
        }
      });
    },

    // delete item
    delProductModal(item){
      $('#delProductModal').modal("show");
      this.tempProducts = Object.assign({}, item);
      // console.log("Products" + this.Products)
      console.log("tempProducts" + this.tempProducts)
    },
    delProduct(){
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProducts.id}`;
      this.$http.delete(api).then((response)=>{
        if(response.data.success){
          $('#delProductModal').modal('hide');
          vm.getProducts();
        }
      })
    },
    uploadFile(){
      console.log(this)
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.$http.post(url, formData ,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response)=>{
        console.log(response.data);
        if(response.data.success){
          // vm.tempProducts.imageUrl = response.data.imageUrl
          vm.$set(vm.tempProducts, 'imageUrl', response.data.imageUrl)
        }
      })
    },
  },
  created() {
    this.getProducts();
  },
 
}
</script>