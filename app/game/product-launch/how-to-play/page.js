export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome, Product Manager! - Player Manual
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Mission:
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to <strong>Project: Bharat Launch</strong>! You are taking on the role of a new Product Manager for a Direct-to-Consumer (D2C) Smart Nutrition drink. Your mission is to successfully launch this product in the Indian market and manage it for 3 virtual years (12 quarters).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            You will start with a crucial research phase (Quarter 0) to build your strategy. From there, you will make all the key decisions based on the 4Ps (Product, Price, Place, Promotion), manage your budgets, and react to market events.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Your success will be measured by your <strong>Final Score</strong>, which is based on your <strong>Total Profit</strong>, <strong>Market Share</strong>, and <strong>Brand Awareness</strong>. Good luck!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What You Will Learn:
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By completing this simulation, you will gain hands-on experience and learn how to:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                1. Research & Segment Your Market:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Analyze data to find viable target market segments.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Use filters (location, income, age) to understand a segment's size, price sensitivity, brand consciousness, media habits, and purchase drivers.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Interpret city-specific data (population, income, competition) to choose your markets.
              </p>
              <p className="text-gray-700 leading-relaxed">
                (Optional) Design your own custom survey questions and use AI-driven insights to get a deeper understanding of your customers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2. Make Strategic Decisions (The 4Ps):
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Build a complete marketing strategy by making integrated decisions across Product, Price, Place, and Promotion.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Manage the trade-offs in <strong>Product</strong> design (Quality, Taste, Packaging) and see how they directly impact your costs (COGS).
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Set the right <strong>Price</strong> by considering your costs, competitor prices, and what your customers are willing to pay.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Choose the best distribution channels (<strong>Place</strong>) based on your target customers and their location (e.g., online for Tier 1 cities, local stores for Tier 2/3).
              </p>
              <p className="text-gray-700 leading-relaxed">
                Set a marketing budget (<strong>Promotion</strong>) and create a media mix (Digital, Influencer, TV, etc.) that matches your target segment's media habits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3. Manage Your Finances & Budget:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Understand the link between your product decisions, costs, price, and profit margins.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Manage a quarterly marketing budget effectively.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Analyze financial reports (Revenue, Costs, Profit) to see how well your strategy is working.
              </p>
              <p className="text-gray-700 leading-relaxed">
                See the impact of fixed costs (like distribution) on your bottom line.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4. Forecast Sales:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Use your market research to make educated sales projections for your first year.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Compare your forecasts to your actual sales to learn how to improve your projection accuracy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                5. Analyze Data & Reports:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Read quarterly reports to understand your financial performance, market share, and brand awareness.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Use this new data every quarter to make better, more informed decisions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                6. Adapt & Solve Problems:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                See the impact of random market events (like competitor actions, supply chain problems, or new regulations).
              </p>
              <p className="text-gray-700 leading-relaxed">
                Adjust your strategy to respond to these unforeseen challenges and opportunities.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How to Play: The Simulation Flow
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                1. Welcome & Setup:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You will enter your name to begin.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2. Quarter 0 - Research & Analysis:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Objective:</strong> Understand the market and pick your target segment(s).
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Your Tools:</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-2 ml-4">
                <strong>Market Research Database:</strong> This is your primary tool. Filter data by City, Income, and Age to find a segment you want to target. Analyze its size, what drives its purchases, and what media it consumes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3 ml-4">
                <strong>Gemini Custom Survey (Optional):</strong> You have a <strong>₹1 Crore Survey Budget</strong> to use only in Q0. You can design your own 5-question survey, check its efficacy, and run it on your filtered segment to get unique AI-powered insights.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Outcome:</strong> Once you have a clear strategy, click "Proceed to Projection Phase".
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3. Quarter 0 - Projection:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Objective:</strong> Based on your research, forecast your unit sales for the first four quarters (Q1-Q4).
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Action:</strong> Enter your projections and click "Lock Projections & LAUNCH".
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Outcome:</strong> Your product is now in the market! Q1 begins, and your main decision panel is unlocked.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4. Quarter 1 - 12 - Operations:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Objective:</strong> Implement and refine your 4P strategy each quarter to maximize your profit and score.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Quarterly Cycle:</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-1 ml-4">
                1. Review your results from the last quarter in the "Quarterly Reports" tab.
              </p>
              <p className="text-gray-700 leading-relaxed mb-1 ml-4">
                2. Check the "Dynamic Market Event" on the "Strategy & Projection" tab to see what's new.
              </p>
              <p className="text-gray-700 leading-relaxed mb-1 ml-4">
                3. Adjust your 4P decisions (Product, Price, Place, Promotion).
              </p>
              <p className="text-gray-700 leading-relaxed mb-1 ml-4">
                4. Click "End Quarter & Run Simulation".
              </p>
              <p className="text-gray-700 leading-relaxed mb-1 ml-4">
                5. Watch the 4-second simulation delay bar as the results are calculated.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3 ml-4">
                6. Your dashboard and reports will update. A new market event will appear for the next quarter.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Game End:</strong> The simulation ends when you complete Q12 (3 years) OR if your cash runs out (Bankruptcy).
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Key Decisions Explained (The 4Ps)
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                1. Product:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                You must allocate 100 points between Quality, Taste, and Packaging.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Higher points increase your COGS (Cost of Goods Sold) but may be necessary to attract high-income or quality-driven customers.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Lower points reduce your costs, which is good for price-sensitive customers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>COGS Formula:</strong> ₹50 + (Quality × 0.8) + (Taste × 0.5) + (Packaging × 0.3)
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2. Price:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                You set the selling price per unit.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                You must balance this with your COGS to ensure you make a profit on each sale.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>CRUCIAL RULE:</strong> If your Price is more than 115% (or 1.15x) of the average competitor price in a specific city, your sales in that city will drop dramatically. Pay attention to the competitor prices in the City Profiles!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3. Place (Distribution):
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Choose your sales channels by checking the boxes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                Each channel has a quarterly fixed cost and is effective for different customer types.
              </p>
              <p className="text-gray-700 leading-relaxed mb-1">
                <strong>D2C Online:</strong> Low cost, good for tech-savvy customers and Tier 1 cities.
              </p>
              <p className="text-gray-700 leading-relaxed mb-1">
                <strong>E-Marketplaces:</strong> Medium cost, gives you broad reach.
              </p>
              <p className="text-gray-700 leading-relaxed mb-1">
                <strong>Supermarkets (T1):</strong> High cost, but good for reaching T1 customers offline.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Kirana Stores (T2/3):</strong> High cost, but essential for reaching Tier 2 and Tier 3 cities.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4. Promotion (Marketing):
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                This is a two-part decision.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Total Budget:</strong> Set your total quarterly marketing budget (from ₹1M to ₹10 Cr). Higher budgets increase Brand Awareness faster.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Marketing Mix:</strong> Allocate 100% of your budget across Digital, Influencer, TV, and Print/OOH. <strong>Check your Q0 research!</strong> You must align your spending with the "Top Media" preferences of your target segment to be effective.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How You Are Measured: Key Metrics
          </h2>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              <strong>Live Score:</strong> This is your primary grade. It is calculated based on your cumulative profit against a target of ₹15 Crore. Score = (Your Total Profit / 150,000,000) × 100. (Capped at 100).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Total Profit:</strong> Your cumulative profit or loss across all quarters.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Market Share:</strong> Your percentage of the total market sales.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Brand Awareness:</strong> How well-known your brand is. This is built by your promotion budget and directly impacts a customer's likelihood to buy.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Watch Out for Market Events!
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Every quarter from Q1 to Q12, a random market event will occur. This can be good or bad. Examples include:
          </p>
          <p className="text-gray-700 leading-relaxed mb-1">
            A competitor launches a new ad campaign (hurting your sales).
          </p>
          <p className="text-gray-700 leading-relaxed mb-1">
            Supply chain problems (increasing your COGS).
          </p>
          <p className="text-gray-700 leading-relaxed mb-1">
            A celebrity endorses your product (boosting your brand awareness).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            An economic recession (reducing everyone's sales).
          </p>
          <p className="text-gray-700 leading-relaxed">
            You must read the event each quarter and adjust your strategy if needed!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            End of the Game: Your Report & Certificate
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When the simulation ends, you will receive two items:
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>1. Player Debriefing Report:</strong> This shows your final score, profit, and a comparison of your sales forecasts vs. your actual sales. Most importantly, it gives you <strong>customized suggestions</strong> for improvement. You can download this as a <strong>.txt file</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>2. Certificate of Completion:</strong> A formal certificate with your name and final score. You can download this as a <strong>.png file</strong> or share it on LinkedIn.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tips for Success:
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Q0 is Everything:</strong> Your Quarter 0 research is the most important part. A good strategy based on data will succeed. A bad strategy (or no strategy) will fail.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Align Your 4Ps:</strong> Make sure your decisions work together. Don't create a high-Quality, high-Price product and try to sell it to low-Income customers. Don't target 18-25 year olds and then spend all your money on TV ads.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Read the Reports:</strong> Use the "Quarterly Reports" tab to see what's working and what isn't.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Watch Your Cash:</strong> Bankruptcy is a real possibility. Don't spend ₹10 Cr on marketing if your profit margins are negative!
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Read the Debrief:</strong> At the end, read your debriefing report. The suggestions will help you understand why you got the score you did.
          </p>
        </section>
      </div>
    </div>
  );
}