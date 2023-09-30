import './loading.less'

// 用于记录当前页面中有多少个请求
let count = 0
// export const showLoading = () => {
// 	if (count === 0) {
// 		const loading = document.createElement("div");
// 		loading.setAttribute("id", "loading");
// 		ReactDom.createRoot(loading).render(<Loading />);
// 	}
// 	count++;
// };
//
// export const hideLoading = () => {
// 	if (count < 0) return;
// 	count--;
// 	if (count === 0) {
// 		document.body.removeChild(
// 			document.getElementById("loading") as HTMLElement,
// 		);
// 	}
// };

export const showLoading = () => {
  if (count === 0) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'flex')
  }
  count++
}

export const hideLoading = () => {
  count--
  if (count === 0) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'none')
  }
}
