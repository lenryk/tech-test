import clsx from "clsx";
import PropTypes from "prop-types";

export default function Section({ name, children, isLoading }) {
  const classes = clsx({
    "section-wrapper": true,
    loading: isLoading,
    metrics: name === "metrics",
  });

  return (
    <section id={name} className={classes}>
      {isLoading ? (
        <div className="loading-text">
          <h2>LOADING...</h2>
          <img
            src="/loader.svg"
            alt="loading icon"
            className="rotate"
            height={36}
            width={36}
          />
        </div>
      ) : null}
      {children}
    </section>
  );
}

Section.propTypes = {
  name: PropTypes.oneOf(["metrics", "time"]).isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
