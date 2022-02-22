import { checkAuthentication, isAuthenticated } from "common/utils/auth.util";
import { NextPage } from "next";

const withAuth = (page: NextPage) => {
  console.log("page.getInitialProps", page.getInitialProps);
  const oldg = page.getInitialProps;
  

  page.getInitialProps = async (ctx)=>{
    const res = await oldg?.(ctx);
    ctx.req
    checkAuthentication(ctx);

    return {
      ...res,

    }
  }
  return page;
};

export default withAuth;
