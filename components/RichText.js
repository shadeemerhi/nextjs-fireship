import dynamic from "next/dynamic";

export default dynamic(() => import("@mantine/rte"), {
  ssr: false,

  /**
   * Render anything as fallback on server
   * e.g. loading or html without editor
   */
  loading: () => null,
});
