import { checkAuthentication, isAuthenticated } from "common/utils/auth.util";
import { NextPage } from "next";

const withAuth = (page: NextPage) => {
  const originalGetInitialProps = page.getInitialProps;
  page.getInitialProps = async (ctx) => {
    ctx.req;
    checkAuthentication(ctx);
    const res = await originalGetInitialProps?.(ctx);

    return {
      ...res,
    };
  };
  return page;
};

export default withAuth;
