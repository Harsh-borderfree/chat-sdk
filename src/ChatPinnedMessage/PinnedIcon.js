import React from 'react'

const PinnedIcon = props => {
  return (
    <svg className='pin_icon' width='20' height='30' viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5.79631 10.2499L5.99047 11.5267L6.00953 11.5267L6.02859 11.5267L6.19147 10.2499L6.25074 8.14844L5.68555 8.14844L5.79631 10.2499Z'
        fill={props?.brandColor}
      />
      <path
        d='M8.54144 7.7056L8.33937 6.86903C8.33294 6.8369 8.32161 6.80611 8.30599 6.7788C8.30106 6.7686 8.29442 6.75858 8.28591 6.74885C8.26971 6.72807 8.25015 6.71088 8.22773 6.69831C8.21519 6.69141 8.20293 6.68376 8.19048 6.67668C8.17727 6.66921 8.16397 6.66194 8.1504 6.65513C8.1354 6.64767 8.12031 6.64068 8.10513 6.63397C8.08825 6.6267 8.07127 6.62009 8.05402 6.61357C8.03516 6.60657 8.01649 6.59987 7.99735 6.59363C7.97661 6.58683 7.95586 6.58041 7.93532 6.57445C7.91306 6.56784 7.89072 6.5617 7.86819 6.55584C7.84434 6.5498 7.82049 6.54384 7.79645 6.53818C7.76608 6.53109 7.73534 6.52552 7.70479 6.51947C7.65721 6.50946 7.61016 6.49661 7.56293 6.48499C7.55006 6.48177 7.53681 6.47837 7.52374 6.47488C7.49392 6.46685 7.46418 6.45731 7.43536 6.44597C7.40682 6.43482 7.37929 6.4215 7.35278 6.40629C7.32655 6.39108 7.30143 6.37379 7.2777 6.35471C7.25359 6.33543 7.23097 6.31437 7.21004 6.29207C7.18882 6.26987 7.16937 6.24597 7.1517 6.22074C7.13403 6.19561 7.11814 6.16925 7.1045 6.14176C7.09076 6.11427 7.07937 6.08574 7.07033 6.05645C7.06081 6.0265 7.05384 5.99617 7.04827 5.96547C7.0427 5.9341 7.03863 5.90255 7.03494 5.8709C7.034 5.86334 7.03249 5.8555 7.0324 5.84804L7.03281 5.88148C7.03248 5.87827 7.03235 5.87506 7.03203 5.87175C7.0317 5.86797 7.03156 5.86429 7.03123 5.8606C7.03108 5.85588 7.03064 5.85125 7.0303 5.84653C7.02995 5.84058 7.02949 5.83453 7.02904 5.82848C7.02857 5.82083 7.02801 5.81327 7.02744 5.80562C7.02685 5.79608 7.02608 5.78663 7.02549 5.77709C7.02469 5.76585 7.0238 5.75451 7.02309 5.74317C7.02217 5.72985 7.02126 5.71681 7.02044 5.70359C7.01921 5.68866 7.01837 5.67392 7.01743 5.65881C7.01619 5.64237 7.01505 5.62602 7.014 5.60958C7.01265 5.59182 7.01149 5.57406 7.01042 5.55621C7.00906 5.5375 7.00779 5.51861 7.00652 5.49962C7.00515 5.47987 7.00377 5.46013 7.0024 5.44029C7.00111 5.41988 6.99963 5.39938 6.99834 5.37888C6.99676 5.35772 6.99537 5.33674 6.99389 5.31558C6.99239 5.29395 6.9909 5.2725 6.98941 5.25077C6.98782 5.22876 6.98651 5.20675 6.98492 5.18483C6.98333 5.16234 6.98173 5.13995 6.98032 5.11747C6.97863 5.09479 6.97722 5.07202 6.97562 5.04926C6.97402 5.02611 6.97251 5.00306 6.9709 4.98001C6.9692 4.95667 6.96769 4.93334 6.96608 4.91C6.96438 4.88638 6.96277 4.86276 6.96106 4.83924C6.95955 4.81543 6.95794 4.79181 6.95623 4.7681C6.95462 4.74439 6.95291 4.72067 6.95149 4.69696C6.94979 4.67344 6.94817 4.64972 6.94656 4.6261C6.94477 4.60277 6.94335 4.57934 6.94174 4.5561C6.94014 4.53305 6.93863 4.51009 6.93684 4.48723C6.93553 4.46465 6.93384 4.44216 6.93234 4.41987C6.93075 4.39814 6.92944 4.37631 6.92786 4.35449C6.92637 4.33352 6.92508 4.31264 6.92369 4.29166C6.92222 4.27164 6.92075 4.25161 6.91965 4.23158C6.9181 4.21268 6.91692 4.19369 6.91556 4.1747C6.9143 4.15694 6.91323 4.13899 6.91179 4.12123C6.91083 4.1046 6.90949 4.08769 6.90853 4.07107C6.9074 4.05557 6.90636 4.04008 6.90532 4.02449C6.9042 4.01013 6.90336 3.99568 6.90234 3.98141C6.90132 3.9679 6.9004 3.95458 6.89967 3.94107C6.89877 3.9286 6.89795 3.91613 6.89704 3.90366C6.89555 3.88155 6.89396 3.85944 6.89152 3.83753C6.88916 3.81495 6.88995 3.79435 6.89809 3.773C6.90128 3.7644 6.90399 3.75439 6.90851 3.74626C6.915 3.72888 6.92224 3.71168 6.93025 3.69477C6.94644 3.66133 6.96644 3.62978 6.98881 3.60011C7.01082 3.57073 7.03501 3.54276 7.06111 3.51678C7.08702 3.4908 7.11523 3.46718 7.14612 3.44735C7.16419 3.43572 7.18274 3.42543 7.20197 3.41589C7.22814 3.40285 7.25431 3.39075 7.28232 3.38197C7.30253 3.37564 7.32302 3.36874 7.34371 3.36383C7.35255 3.36081 7.36129 3.35807 7.37003 3.35504C7.3813 3.35136 7.39258 3.3473 7.40366 3.34323C7.41531 3.33889 7.42618 3.33331 7.43744 3.32812C7.45096 3.32198 7.46437 3.31584 7.47759 3.30894C7.49709 3.29874 7.5161 3.28636 7.53309 3.27209C7.54066 3.26567 7.54793 3.25849 7.55425 3.25065C7.58996 3.21607 7.6134 3.16534 7.62288 3.10695L7.80455 2.27029C7.80306 2.16457 7.71576 2.07813 7.61018 2.07813L5.89347 2.07812H4.17677C4.07118 2.07812 3.986 2.16457 3.9873 2.2701L4.18947 3.10676C4.20037 3.16515 4.22505 3.21588 4.26162 3.25046C4.26803 3.2583 4.27558 3.26548 4.2833 3.27191C4.30064 3.28608 4.31995 3.29845 4.3397 3.30875C4.35309 3.31565 4.36666 3.32179 4.38032 3.32793C4.39171 3.33313 4.40282 3.3387 4.41447 3.34305C4.42566 3.34711 4.43703 3.35117 4.4484 3.35485C4.4573 3.35778 4.46611 3.36062 4.47502 3.36364C4.49574 3.36865 4.51649 3.37545 4.53676 3.38178C4.56499 3.39066 4.59137 3.40275 4.61785 3.4157C4.63731 3.42524 4.65612 3.43554 4.67447 3.44716C4.70585 3.467 4.73464 3.49061 4.76128 3.51659C4.78792 3.54248 4.8128 3.57054 4.83552 3.59992C4.85863 3.62959 4.87939 3.66105 4.89641 3.69459C4.90483 3.7115 4.91249 3.72869 4.9194 3.74607C4.92422 3.7542 4.92708 3.76421 4.93049 3.77281C4.93915 3.79416 4.94053 3.81476 4.93864 3.83734C4.93683 3.85935 4.93569 3.88136 4.93473 3.90347C4.93403 3.91603 4.93353 3.9285 4.93302 3.94088C4.93252 3.95439 4.93193 3.96771 4.93125 3.98122C4.93048 3.99549 4.93 4.00994 4.92932 4.0243C4.92857 4.03989 4.92791 4.05538 4.92734 4.07088C4.92661 4.0876 4.92578 4.10451 4.92522 4.12104C4.92421 4.1388 4.92359 4.15675 4.92286 4.17452C4.92186 4.19341 4.92115 4.2124 4.92016 4.23139C4.91946 4.25142 4.91857 4.27145 4.9175 4.29148C4.91672 4.31245 4.91584 4.33333 4.91487 4.3543C4.91382 4.37612 4.91305 4.39795 4.91199 4.41968C4.91104 4.44197 4.9099 4.46446 4.90914 4.48704C4.908 4.5099 4.90696 4.53286 4.90592 4.55591C4.90489 4.57915 4.90404 4.60258 4.90282 4.62592C4.90179 4.64953 4.90076 4.67325 4.89963 4.69677C4.89879 4.72048 4.89766 4.7442 4.89663 4.76791C4.89551 4.79162 4.89457 4.81524 4.89354 4.83905C4.89241 4.86257 4.89138 4.88619 4.89026 4.90981C4.88922 4.93315 4.88828 4.95648 4.88715 4.97982C4.88611 5.00287 4.88517 5.02592 4.88413 5.04907C4.88309 5.07184 4.88224 5.09451 4.8811 5.11728C4.88024 5.13976 4.8792 5.16215 4.87824 5.18464C4.8771 5.20656 4.87633 5.22857 4.87528 5.25058C4.87432 5.27222 4.87335 5.29376 4.87239 5.31539C4.87143 5.33655 4.87055 5.35753 4.86949 5.37869C4.8687 5.39928 4.86763 5.41979 4.86694 5.4401C4.86605 5.45994 4.86516 5.47968 4.86427 5.49943C4.86346 5.51832 4.86266 5.53722 4.86185 5.55602C4.86103 5.57387 4.8603 5.59154 4.85948 5.6094C4.85874 5.62593 4.858 5.64227 4.85726 5.65862C4.85659 5.67364 4.85611 5.68838 4.85544 5.7034C4.85476 5.71662 4.85416 5.72966 4.85376 5.74298C4.85324 5.75432 4.85262 5.76566 4.85219 5.7769C4.85184 5.78644 4.85129 5.79589 4.85094 5.80543C4.85056 5.81308 4.85028 5.82064 4.8499 5.82829C4.8496 5.83434 4.84929 5.84039 4.84908 5.84634C4.84886 5.85106 4.84854 5.85569 4.8485 5.86041C4.84826 5.8641 4.84821 5.86778 4.84798 5.87156C4.84773 5.87477 4.84768 5.87799 4.84753 5.88129L4.84712 5.84785C4.84721 5.85531 4.8457 5.86315 4.84504 5.87071C4.84213 5.90236 4.83883 5.93392 4.83403 5.96528C4.82921 5.99599 4.82298 6.02631 4.81419 6.05626C4.80578 6.08555 4.79509 6.11408 4.78203 6.14157C4.76897 6.16906 4.75381 6.19542 4.73685 6.22055C4.71971 6.24578 4.70075 6.26958 4.68017 6.29188C4.65978 6.31418 4.63768 6.33524 4.61423 6.35452C4.59078 6.3736 4.56608 6.39089 4.54023 6.4061C4.51409 6.42131 4.48689 6.43463 4.45872 6.44578C4.43008 6.45712 4.40066 6.46666 4.37094 6.47469C4.35797 6.47818 4.34499 6.48159 4.332 6.4848C4.28506 6.49642 4.23833 6.50927 4.19099 6.51928C4.16058 6.52533 4.13008 6.5309 4.09979 6.53799C4.07589 6.54366 4.05218 6.54951 4.02848 6.55565C4.00619 6.56151 3.9839 6.56765 3.962 6.57426C3.94131 6.58022 3.92082 6.58664 3.90024 6.59344C3.88145 6.59968 3.86275 6.60639 3.84406 6.61338C3.82697 6.6198 3.81016 6.62651 3.79346 6.63378C3.77853 6.6404 3.76362 6.64748 3.74871 6.65495C3.7353 6.66165 3.72218 6.66893 3.70915 6.67649C3.69688 6.68348 3.6848 6.69113 3.67243 6.69812C3.65032 6.71069 3.63118 6.72788 3.61549 6.74867C3.60722 6.75849 3.60092 6.7685 3.59614 6.77861C3.58119 6.80592 3.57072 6.83671 3.56498 6.86884L3.3834 7.70541C3.38469 7.81103 3.472 7.89757 3.57749 7.89757H5.68218H6.24737H8.35207C8.45756 7.89785 8.54274 7.81132 8.54144 7.7056Z'
        fill={props?.brandColor}
      />
    </svg>
  )
}

export default PinnedIcon
