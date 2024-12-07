import { useEffect, useRef } from "react";

// Adjust the height of the rows of all cards in a specific page. The baseline for the adjustment is the height of the row with more content
// The logic is based on the classes (css) applied to the <Card/> component
// Only the rows with the class .card-content will be adjusted
export default function useResponsiveCardRows(dependencyArray: any, setLoadCount: React.Dispatch<React.SetStateAction<number>> | null=null) {
    // Creates a ref to the card container so it can be manipulated in the DOM
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardSelector = ".card";
    const rowSelector = ".card__section";

    useEffect(() => {
        // Makes sure that the hook is only executed when all the data is fetched. This is needed because the hook can be called from children compoents
        // that relies on  the parent's data
        if (!dependencyArray[0]) {
            return;
        }

        function responsiveCardRows() {
            const container = containerRef.current;
            if (!container) return;

            // Loop through all cards and get all the rows with class .card__content for each card
            const cards = Array.from(container.querySelectorAll(cardSelector));
            if (cards.length === 0) {
                setTimeout(responsiveCardRows, 100);
                return;
            }

            const rowGroups: HTMLElement[][] = [];

            //  Groups all rows in the same position (i.e.: all 1st rows, all 2nd rows and so on)
            cards.forEach((card) => {
                const rows = Array.from(card.querySelectorAll(rowSelector));
                rows.forEach((row, rowIndex) => {
                    if (!rowGroups[rowIndex]) rowGroups[rowIndex] = [];
                    rowGroups[rowIndex].push(row as HTMLElement);
                });
            });

            // Reset heights to auto before recalculating
            Object.values(rowGroups).forEach((group) =>
                group.forEach((row) => (row.style.height = "auto"))
            );

            // For each group of rows (1st, 2nd, 3rd), determine the row with max height and then set this height to all rows of the group
            Object.values(rowGroups).forEach((group) => {
                const maxHeight = Math.max(...group.map((row) => row.offsetHeight));
                group.forEach((row) => {
                    row.style.height = `${maxHeight}px`;
                });
            });
        }

        responsiveCardRows();

        // makes sure that the resize function is called in case the browser is resized
        window.addEventListener("resize", responsiveCardRows);

        // Counter for controlling Skeleton in pages that use it
        if (setLoadCount){
            console.log("loadCount useResponsiveCardRows")
            setLoadCount(count=> count+1)
        }

        // Cleanup function for removing the event listener when the component is unmounted
        return () => window.removeEventListener("resize", responsiveCardRows);
    }, [dependencyArray]);

    return containerRef; // Return the container ref for the component to attach
}

            

