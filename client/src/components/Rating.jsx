const Rating = ({ rating }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <span>
        {rating >= 1 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        ) : rating >= 0.5 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star-half"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        ) : rating >= 1.5 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star-half"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        ) : rating >= 2.5 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star-half"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        ) : rating >= 3.5 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star-half"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        ) : rating >= 4.5 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star-half"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="#374151"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#374151"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Rating;
