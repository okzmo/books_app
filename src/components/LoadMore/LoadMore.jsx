import React from "react";
import { AppContext } from "../../FetchData";

function LoadMore() {
	const target = React.useRef();
	const { fetchNewBooks } = React.useContext(AppContext);

	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				fetchNewBooks();
			}
		});

		observer.observe(target.current);
	}, []);

	return <div ref={target} style={{ minHeight: 200 }}></div>;
}

export default LoadMore;
