// This module receives a router from the Context Provider and populates globalRouter with it, so the router can be used inside regular functions 
// that are not hooks
// This became necessary once the MyClasses page was put inside a suspense (2024/12/04) to show the Loading page while data is being fetched
// For this to work, useGetSectionDataWithParams had to be moved inside an async function inside classes/myclasses/page.tsx, and then useRouter
// that was previously used inside useGetSectionDataWithParams stopped working (again, because it cannot be used inside regular functions)
// Now useGetSectionDataWithParams uses this globalRouter instead of instantiating the router inside itself...
let globalRouter: any = null;

export const setGlobalRouter = (router: any) => {
    globalRouter = router;
};

export const getGlobalRouter = () => {
    if (!globalRouter) {
        throw new Error("Router has not been initialized.");
    }
    return globalRouter;
};