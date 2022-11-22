import React from "react";
import { connect } from "react-redux";
import { AppState, wrapper } from "app/store";
import { fetchProduct } from "app/store/slices/product";

const KaiseHo = (props:any) => {
  const { product, profile } = props;
  console.log("product",product);
  console.log("profile",profile);
  return <div>
    <h1>Name:{profile.name}</h1>
    <h2>Product Name: { product.name }</h2>
  </div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      console.log(
        "kaise-ho.tsx => store state on the server before dispatch",
        store.getState()
      );
      if(store.getState() !== null){
        console.log("name present hai iska");
      }else{
        console.log("name present nahi hai");
        // await store.dispatch(fetchProduct());
      }
      const productData = query.data || "page data";
      //  http://localhost:3000/product?data='some-data'
      console.log("kaise-ho.tsx => store state on the server after dispatch", store.getState());

      return {
        props: {
          productData,
        },
      };
    }
);

const mapStateToProps = (state: AppState) => ({
  profile: state.profile,
  product: state.product,
});

export default connect(mapStateToProps)(KaiseHo);
