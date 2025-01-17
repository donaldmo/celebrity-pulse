import Navigation from "@/components/Navigation";
import NavigationContnet from "@/components/NavigationContent";


export default function success() {
    return (
        <main id="songs-one">
            <div id="songs-one-content">
                <Navigation />
                <NavigationContnet />

                <div>
                    <div className="heading">
                        <div className="text">
                            Success Ticket Purchased!
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}