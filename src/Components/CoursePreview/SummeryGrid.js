import './coursePreview.css'

function SummaryGrid({summary, color}) {
  const getSummary = () => {
    return (
      summary.map((course, i) => 
        <div className="summary_item" key={i}>
            <div className="summery_ellipse" style={{background: color}}/>
            <div className="summary_item_text">
                {course}
            </div>
        </div>)
    );
  }

  return (
    <div className="summary_grid">
        {getSummary()}
    </div>
  );
}

export default SummaryGrid;