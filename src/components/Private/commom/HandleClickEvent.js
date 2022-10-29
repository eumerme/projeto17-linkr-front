export default function handleClickEvent({
	useref,
	type,
	setSearch,
	...otherprops
}) {
	console.log({
		useref,
		isActiveLogout: otherprops.isActiveLogout,
		isActiveSearch: otherprops.isActiveSearch,
		isActiveTrending: otherprops.isActiveTrending,
		type,
		setSearch,
	});
	const pageClickEvent = (e) => {
		const activeElementExists = useref.current !== null;
		const isClickedOutside = !useref.current?.contains(e.target);

		if (activeElementExists && isClickedOutside) {
			if (type === "logout") {
				otherprops.setIsActiveLogout(!otherprops.isActiveLogout);
			}
			if (type === "trending") {
				otherprops.setIsActiveTrending(!otherprops.isActiveTrending);
			}

			if (type === "searchUser") {
				setSearch("");
				otherprops.setIsActiveSearch(!otherprops.isActiveSearch);
			}
		}
	};

	if (
		otherprops.isActiveLogout ||
		otherprops.isActiveSearch ||
		otherprops.isActiveTrending
	) {
		window.addEventListener("click", pageClickEvent);
	}

	return () => {
		window.removeEventListener("click", pageClickEvent);
	};
}
