import { FC } from "react";

export interface MineBombIconProps {
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}
export const MineBombIcon: FC<MineBombIconProps> = (props) => {
  const { className, onClick } = props;
  return (
    <svg
      width="90"
      height="94"
      viewBox="0 0 90 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <rect width="90" height="90" rx="10" fill="#FF4F4F" />
      <rect
        y="1"
        width="90"
        height="89"
        rx="10"
        fill="url(#paint0_linear_2114_53137)"
      />
      <g filter="url(#filter0_f_2114_53137)">
        <circle cx="45.5" cy="53.5" r="30.5" fill="#F53131" />
      </g>
      <path
        d="M70.5786 61.7585C70.1244 63.4472 69.4949 65.0884 68.7132 66.6562C67.1528 69.7955 64.9439 72.6116 62.2837 74.9068C59.6216 77.2053 56.491 78.9588 53.1414 80.0556C49.7888 81.147 46.2144 81.5501 42.7034 81.2694C39.1936 80.9749 35.7338 79.9884 32.6049 78.3645C29.4782 76.7356 26.6791 74.4898 24.4272 71.7897C22.179 69.0882 20.4593 65.9483 19.4358 62.596C18.9196 60.9212 18.5692 59.1975 18.3959 57.4587C18.2261 55.7186 18.2278 53.9665 18.3951 52.2332C18.738 48.7691 19.7727 45.3794 21.4257 42.3399C23.072 39.2982 25.3297 36.6079 28.0032 34.467C29.4014 33.359 30.9078 32.3938 32.4894 31.5932C36.7952 29.2406 41.8088 28.0756 47.0526 28.5078C52.3276 28.9427 57.1054 30.9322 60.9794 33.9869C62.3834 35.0249 63.6885 36.2062 64.867 37.5092C67.1522 40.0589 68.939 43.0808 70.065 46.3511C71.1998 49.6203 71.6619 53.1334 71.4349 56.6053C71.316 58.3426 71.0309 60.0713 70.5786 61.7585Z"
        fill="#B15D5D"
      />
      <path
        d="M71.0061 56.5738C69.8182 70.9844 57.1755 81.7016 42.7648 80.5137C28.356 79.326 17.637 66.6831 18.8249 52.2724C20.0126 37.8636 32.6573 27.1448 47.0662 28.3325C52.0342 28.742 56.5617 30.5141 60.3158 33.25C62.1445 34.5826 63.7895 36.1439 65.2113 37.8895C69.3365 42.9534 71.5848 49.5537 71.0061 56.5738Z"
        fill="url(#paint1_linear_2114_53137)"
      />
      <path
        d="M71.0061 56.5708C69.8182 70.9814 57.1755 81.6986 42.7648 80.5107C28.356 79.323 17.637 66.6801 18.8249 52.2694C20.0126 37.8606 32.6573 27.1418 47.0662 28.3295C52.0342 28.739 56.5617 30.5111 60.3158 33.247C62.1445 34.5796 63.7895 36.1409 65.2113 37.8865C69.3365 42.9504 71.5848 49.5507 71.0061 56.5708Z"
        fill="url(#paint2_radial_2114_53137)"
      />
      <path
        d="M68.7989 52.1887C67.9132 62.9339 58.4842 70.9268 47.739 70.041C36.9955 69.1555 29.0027 59.7265 29.8884 48.9813C30.774 38.2378 40.2031 30.2433 50.9466 31.1288C52.706 31.2739 54.3908 31.6494 55.9758 32.222C63.457 34.9181 68.6964 42.0111 68.8613 50.1649C68.8757 50.8343 68.855 51.5077 68.7989 52.1887Z"
        fill="url(#paint3_radial_2114_53137)"
        fill-opacity="0.3"
      />
      <path
        style={{
          mixBlendMode: "screen",
        }}
        d="M28.8244 40.7393C28.8843 41.074 29.0206 41.3893 29.2578 41.6569C30.3163 42.851 31.9545 42.4406 33.098 41.6485C34.7603 40.4971 36.4371 39.2425 38.2603 38.3032C40.122 37.3442 42.2102 36.9126 44.2202 36.3404C45.0683 36.099 45.7898 35.6752 45.3614 34.7148C43.9967 31.6558 40.3511 31.8708 37.6635 32.6308C34.4532 33.5387 30.8908 35.5526 29.2546 38.5859C28.9207 39.2049 28.695 40.0173 28.8244 40.7393Z"
        fill="url(#paint4_linear_2114_53137)"
      />
      <path
        d="M50.8263 34.3661C49.1679 36.0207 52.6906 42.1523 55.256 45.3658C58.5291 49.4659 64.3162 53.9171 66.759 52.3735C68.6983 51.1481 67.7732 46.6229 67.7088 46.3222C65.832 37.5667 53.1026 32.0952 50.8263 34.3661Z"
        fill="#1A1A1A"
      />
      <path
        d="M60.664 28.5208L52.5186 34.6031C52.5186 34.6031 52.005 37.9328 57.6517 42.8268C63.2984 47.7209 66.0591 47.1148 67.4615 47.0384L71.227 37.5588L60.664 28.5208Z"
        fill="url(#paint5_linear_2114_53137)"
      />
      <path
        d="M71.3103 37.5397C70.9918 37.9247 70.1122 37.7728 68.9476 37.215C68.4912 36.997 67.9906 36.714 67.4622 36.3818C67.4353 36.3652 67.4119 36.3488 67.3849 36.3321C67.1157 36.1621 66.841 35.9735 66.5598 35.7771C66.286 35.5778 66.0057 35.3707 65.7231 35.1489C65.437 34.927 65.1482 34.6939 64.8603 34.4501C64.5689 34.206 64.2886 33.9556 64.0222 33.7099C63.92 33.6185 63.8213 33.5274 63.7264 33.433C63.4801 33.1998 63.2476 32.9715 63.0257 32.7439C62.9282 32.6384 62.8336 32.5404 62.7393 32.4388C62.2255 31.8878 61.7879 31.3539 61.4422 30.8672C60.6878 29.7984 60.3793 28.9468 60.6942 28.5615C61.0095 28.1726 61.889 28.3245 63.0569 28.8861C63.493 29.0916 63.9737 29.3585 64.4749 29.6777C64.5859 29.7481 64.7002 29.8225 64.8144 29.8969C64.9588 29.9917 65.1064 30.0905 65.2569 30.1967C65.6186 30.4466 65.9927 30.7192 66.3682 31.0171C66.6244 31.215 66.883 31.4275 67.1445 31.6475C67.1577 31.6594 67.1708 31.6714 67.1843 31.6797C67.4754 31.9273 67.7557 32.1777 68.0221 32.4233C68.0877 32.4865 68.1536 32.546 68.2193 32.6092C68.2553 32.6446 68.2916 32.6765 68.3273 32.7155C68.6231 32.9924 68.9009 33.2715 69.1609 33.5527C69.2719 33.6664 69.3826 33.7838 69.4863 33.9005C69.9044 34.368 70.2674 34.8164 70.5622 35.2339C71.317 36.2991 71.6255 37.1508 71.3103 37.5397Z"
        fill="url(#paint6_linear_2114_53137)"
      />
      <path
        d="M69.0482 36.9155C68.6004 36.7041 68.1106 36.4327 67.5944 36.1107C66.7877 35.608 65.9156 34.9788 65.0402 34.2508C64.2615 33.605 63.5581 32.9461 62.9607 32.3152C62.457 31.7826 62.0242 31.2704 61.6866 30.7999C60.9472 29.7745 60.6433 28.9547 60.9518 28.5827C60.8083 28.6775 60.663 28.7738 60.5142 28.8746C60.4737 29.3849 60.7788 30.0934 61.4255 30.9884C61.7762 31.4761 62.2147 31.9969 62.7275 32.5384C63.3532 33.1973 64.0629 33.8584 64.834 34.4987C65.6898 35.209 66.5859 35.8612 67.4232 36.3842C67.9488 36.7118 68.4493 36.9889 68.9112 37.2063C69.9096 37.6763 70.6613 37.8465 71.1568 37.7145C71.2286 37.5492 71.2968 37.3884 71.3631 37.2307C71.0547 37.6011 70.193 37.4525 69.0482 36.9155Z"
        fill="#999999"
      />
      <path
        d="M68.5818 34.9174C68.4368 35.0896 68.0353 35.0209 67.5035 34.7703C67.2951 34.6723 67.0665 34.5452 66.8252 34.3961C66.8128 34.3887 66.8022 34.3813 66.7898 34.3738C66.6669 34.2975 66.5414 34.2128 66.413 34.1247C66.2879 34.0352 66.1599 33.9423 66.0307 33.8428C65.9 33.7432 65.7681 33.6386 65.6366 33.5292C65.5034 33.4197 65.3754 33.3073 65.2536 33.1971C65.2069 33.1561 65.1618 33.1153 65.1184 33.0729C65.0059 32.9683 64.8996 32.8659 64.7982 32.7638C64.7536 32.7165 64.7104 32.6726 64.6673 32.627C64.4325 32.3799 64.2325 32.1404 64.0744 31.9222C63.7294 31.4431 63.588 31.0615 63.7314 30.8892C63.875 30.7152 64.2765 30.7839 64.8098 31.0362C65.0089 31.1285 65.2284 31.2484 65.4573 31.3917C65.5081 31.4233 65.5602 31.4567 65.6124 31.4901C65.6783 31.5327 65.7458 31.577 65.8145 31.6247C65.9798 31.7368 66.1506 31.8592 66.3222 31.9928C66.4392 32.0816 66.5574 32.177 66.6768 32.2757C66.6829 32.281 66.6889 32.2864 66.695 32.2901C66.828 32.4013 66.9561 32.5136 67.0779 32.6238C67.1078 32.6521 67.1379 32.6788 67.1679 32.7071C67.1844 32.723 67.201 32.7373 67.2173 32.7548C67.3525 32.879 67.4794 33.0042 67.5983 33.1303C67.649 33.1813 67.6996 33.234 67.747 33.2863C67.9381 33.496 68.1041 33.697 68.2389 33.8842C68.584 34.3618 68.7254 34.7434 68.5818 34.9174Z"
        fill="#24262B"
      />
      <path
        d="M67.0212 33.4928C66.9529 33.6358 66.8524 33.7567 66.7416 33.8671C66.6428 33.9672 66.5322 34.055 66.4133 34.126C66.2882 34.0365 66.1602 33.9436 66.031 33.8441C65.9003 33.7445 65.7684 33.6399 65.6369 33.5305C65.5037 33.421 65.3757 33.3086 65.2539 33.1984C65.2072 33.1574 65.1621 33.1166 65.1188 33.0742C65.2479 33.017 65.3901 32.9771 65.5421 32.9557C65.6778 32.9361 65.8214 32.9189 65.956 32.8928C66.0938 32.867 66.2303 32.8379 66.3685 32.8073C66.5068 32.7767 66.6484 32.7431 66.7902 32.708C66.8877 32.6821 66.9821 32.6543 67.0782 32.6251C67.1212 32.6125 67.1644 32.5983 67.2075 32.5857C67.214 32.6428 67.219 32.6997 67.2176 32.7561C67.2159 33.0128 67.1403 33.2635 67.0212 33.4928Z"
        fill="url(#paint7_linear_2114_53137)"
      />
      <path
        d="M57.8401 17.7047C57.3638 18.1799 56.7712 18.3013 56.1825 18.0767C55.9993 18.0094 55.8178 17.9047 55.6446 17.7623C55.3824 17.5593 55.1084 17.3507 54.8229 17.1593C54.541 16.9725 54.2405 16.7759 53.9376 16.6085C54.3118 15.9526 55.0808 15.6584 55.7746 15.8841C55.9902 15.952 56.1936 16.0678 56.3725 16.2211C56.6434 16.4509 56.9014 16.701 57.1458 16.9427C57.3913 17.1971 57.6214 17.4415 57.8401 17.7047Z"
        fill="url(#paint8_linear_2114_53137)"
      />
      <path
        d="M60.4635 18.05C59.8944 18.3778 59.2919 18.3401 58.766 17.9746C58.6015 17.8605 58.4478 17.7196 58.3068 17.5374C58.0957 17.2688 57.8706 17.0062 57.6327 16.7447C57.3939 16.4929 57.141 16.2261 56.8775 15.9877C57.3907 15.4512 58.2144 15.3706 58.8478 15.766C59.044 15.8921 59.2185 16.0506 59.3604 16.2441C59.7841 16.8393 60.1543 17.4324 60.4635 18.05Z"
        fill="url(#paint9_linear_2114_53137)"
      />
      <path
        d="M62.9185 19.0682C62.2953 19.2293 61.727 19.0369 61.301 18.5517C61.1701 18.3944 61.0523 18.2184 60.9547 18.0131C60.6653 17.381 60.3143 16.7669 59.9069 16.1526C60.5269 15.7753 61.3497 15.9194 61.8762 16.469C61.9574 16.5528 62.0311 16.6437 62.0973 16.7416C62.162 16.8413 62.2178 16.9498 62.2658 17.0622C62.5468 17.7289 62.7596 18.4125 62.9185 19.0682Z"
        fill="url(#paint10_linear_2114_53137)"
      />
      <path
        d="M64.9986 20.7101C64.3741 20.679 63.8878 20.3442 63.5968 19.7704C63.5062 19.592 63.4364 19.391 63.3937 19.1667C63.2599 18.5009 63.0701 17.804 62.8122 17.1225C63.4958 16.929 64.2577 17.2961 64.6356 17.963C64.7498 18.1733 64.8327 18.3959 64.8701 18.6351C64.9727 19.352 65.0197 20.0428 64.9986 20.7101Z"
        fill="url(#paint11_linear_2114_53137)"
      />
      <path
        d="M66.946 20.8907C66.8568 21.5943 66.7183 22.2487 66.51 22.8586C65.9373 22.6327 65.5788 22.1823 65.4584 21.5622C65.4169 21.3718 65.4121 21.1557 65.4234 20.9399C65.4735 20.2719 65.4551 19.5755 65.3778 18.8501C66.0754 18.8671 66.7126 19.4464 66.8981 20.1904C66.9572 20.4181 66.9706 20.6594 66.946 20.8907Z"
        fill="url(#paint12_linear_2114_53137)"
      />
      <path
        d="M68.4054 23.0008C68.3922 23.2329 68.3569 23.4523 68.2546 23.6626C68.109 23.9751 67.9697 24.2644 67.8053 24.5444C67.6377 24.8247 67.4733 25.0854 67.2948 25.3311C66.818 24.9341 66.6361 24.3917 66.69 23.7896C66.7131 23.5987 66.7677 23.3987 66.839 23.2038C67.0771 22.6027 67.2451 21.9541 67.3667 21.251C68.0085 21.4923 68.4516 22.2459 68.4054 23.0008Z"
        fill="url(#paint13_linear_2114_53137)"
      />
      <path
        d="M69.1025 25.5535C69.1009 25.7313 69.0526 25.9097 68.9969 26.0775C68.9235 26.2854 68.8259 26.4743 68.6761 26.6369C68.4585 26.8777 68.2524 27.103 68.0242 27.314C67.7958 27.5234 67.5761 27.7191 67.3452 27.898C67.2637 27.7706 67.1915 27.6393 67.1465 27.504C67.0982 27.3691 67.0821 27.2315 67.0627 27.0942C67.0464 26.9549 67.0528 26.8155 67.0801 26.6759C67.1106 26.5361 67.1364 26.3983 67.1978 26.2608C67.2694 26.0901 67.3783 25.9213 67.4962 25.763C67.6803 25.5265 67.8771 25.268 68.0456 24.9989C68.2108 24.7285 68.3858 24.4395 68.5385 24.1362C68.672 24.2464 68.772 24.3819 68.8619 24.5329C68.9453 24.6827 69.0249 24.8458 69.0571 25.0208C69.0924 25.1956 69.1088 25.3752 69.1025 25.5535Z"
        fill="url(#paint14_linear_2114_53137)"
      />
      <path
        d="M69.0618 28.1203C69.0412 28.4597 68.9449 28.8004 68.7445 29.0753C68.6228 29.2452 68.4897 29.3951 68.3129 29.5049C68.052 29.6717 67.7998 29.8266 67.5431 29.9656C67.2782 30.1036 67.0204 30.2298 66.7648 30.3429C66.5608 29.7684 66.678 29.2079 67.0198 28.7485C67.131 28.6069 67.2738 28.4772 67.4243 28.3631C67.6558 28.1922 67.9039 28.0071 68.1297 27.806C68.3555 27.6049 68.5898 27.3886 68.8115 27.1571C68.9053 27.2964 68.9633 27.4516 69.0075 27.6159C69.045 27.7777 69.077 27.9511 69.0618 28.1203Z"
        fill="url(#paint15_linear_2114_53137)"
      />
      <path
        d="M68.3919 30.5019C68.3923 30.6634 68.3752 30.8296 68.3316 30.9867C68.2829 31.1409 68.2161 31.2918 68.1305 31.4297C68.0894 31.4993 68.0432 31.5661 67.9934 31.6283C67.9402 31.6892 67.8819 31.7457 67.8216 31.7991C67.6708 31.9294 67.5031 32.0321 67.3212 32.0987C67.0415 32.1944 66.7623 32.2755 66.4905 32.3495C66.2203 32.4234 65.9355 32.4759 65.6683 32.5269C65.6343 32.2309 65.6831 31.9603 65.7788 31.7101C65.8269 31.5866 65.9 31.474 65.9799 31.3656C66.0582 31.2558 66.1519 31.1577 66.2643 31.0709C66.4058 30.9656 66.5597 30.8722 66.7317 30.8031C67.2643 30.5994 67.7872 30.3384 68.314 30.0253C68.372 30.1805 68.3898 30.3389 68.3919 30.5019Z"
        fill="url(#paint16_linear_2114_53137)"
      />
      <path
        d="M55.2315 18.0504C54.8759 18.6386 54.331 18.9079 53.7173 18.8307L52.8643 16.7845C53.0839 16.8037 53.3019 16.8617 53.5059 16.9661C53.8131 17.1266 54.1138 17.3055 54.3995 17.4791C54.6879 17.667 54.9647 17.851 55.2315 18.0504Z"
        fill="url(#paint17_linear_2114_53137)"
      />
      <path
        d="M39.3057 15.9269C39.1041 15.9038 38.9022 15.9227 38.713 15.983C38.5242 16.0402 38.3465 16.137 38.1935 16.2698C38.0434 16.4044 37.9135 16.5698 37.8462 16.7985C38.0813 16.8275 38.2664 16.8153 38.4425 16.7959C38.6171 16.7748 38.7766 16.7411 38.9324 16.6925C39.0882 16.6456 39.2401 16.5854 39.3954 16.5045C39.5524 16.4221 39.7121 16.3271 39.8898 16.1705C39.7069 16.0181 39.5054 15.953 39.3057 15.9269ZM42.9175 23.8302C42.7466 23.9632 42.6097 24.1344 42.5146 24.3269C42.4196 24.5194 42.3666 24.7315 42.3649 24.9478C42.3664 25.1644 42.4113 25.3846 42.5497 25.5866C42.7179 25.4083 42.8261 25.2524 42.9274 25.1008C43.024 24.9489 43.1069 24.8055 43.1805 24.6564C43.2558 24.5076 43.3201 24.3545 43.3808 24.1867C43.4402 24.0139 43.4972 23.8328 43.5364 23.5921C43.2916 23.6026 43.0881 23.7005 42.9175 23.8302ZM52.0666 24.5666C52.0593 24.3996 52.0409 24.2317 52.0086 24.0546C51.9733 23.8756 51.9322 23.6881 51.8392 23.4639C51.6373 23.6008 51.5139 23.7844 51.4316 23.9796C51.3509 24.1749 51.3157 24.3868 51.3243 24.5959C51.3313 24.8049 51.3835 25.0144 51.4794 25.2032C51.5786 25.3907 51.7162 25.5636 51.9311 25.6815C52.0051 25.4501 52.0319 25.2617 52.0516 25.0808C52.0681 24.9012 52.0738 24.7336 52.0666 24.5666ZM47.6809 7.23782C47.6536 7.05948 47.6186 6.89665 47.5704 6.73598C47.5239 6.57545 47.4658 6.4172 47.3922 6.25281C47.3137 6.08802 47.2276 5.91774 47.0822 5.7216C46.9202 5.90372 46.8465 6.11089 46.8131 6.31976C46.7828 6.53051 46.7992 6.74348 46.8585 6.94547C46.9163 7.14571 47.017 7.33493 47.1573 7.49512C47.2993 7.65383 47.474 7.78778 47.7111 7.85096C47.7263 7.60826 47.7065 7.41763 47.6809 7.23782ZM56.2383 7.92058C55.9574 8.03636 55.6996 8.20414 55.4775 8.41035C55.2538 8.61486 55.0672 8.85957 54.9303 9.12939C54.7965 9.40105 54.7042 9.69715 54.7116 10.0193C54.9783 9.8409 55.1887 9.65956 55.3939 9.48262C55.5975 9.30552 55.7896 9.13074 55.9817 8.95596C56.1724 8.77944 56.36 8.60104 56.5533 8.41181C56.7451 8.22083 56.9421 8.02545 57.1407 7.77203C56.8218 7.74091 56.519 7.80803 56.2383 7.92058Z"
        fill="url(#paint18_linear_2114_53137)"
      />
      <g filter="url(#filter1_f_2114_53137)">
        <ellipse
          cx="50.2106"
          cy="15.0379"
          rx="7.64151"
          ry="7.64151"
          transform="rotate(4.71229 50.2106 15.0379)"
          fill="#F53131"
        />
      </g>
      <path
        style={{
          mixBlendMode: "screen",
        }}
        d="M59.449 16.6511C58.9867 22.2598 54.4446 26.4623 49.3039 26.0385C44.1632 25.6148 40.3706 20.7253 40.8329 15.1166C41.2952 9.50876 45.8372 5.30628 50.978 5.73004C56.1187 6.15379 59.9113 11.0433 59.449 16.6511Z"
        fill="url(#paint19_radial_2114_53137)"
        fill-opacity="0.5"
      />
      <path
        d="M40.5831 7.90002C40.4682 7.78703 41.7722 8.83532 43.5485 9.47741C44.4775 9.81322 46.6338 10.5926 48.3016 9.60468C49.4456 8.92701 49.8788 7.70267 50.501 5.94425C50.9225 4.75301 51.0989 3.71672 51.1811 3.01083C51.1333 4.0319 51.187 5.70833 51.9106 7.57862C52.3214 8.64044 52.8759 10.0739 54.0791 10.9438C55.9441 12.2923 58.9185 11.9623 61.6261 10.3748C60.4492 11.2531 59.129 12.2456 57.6892 13.3402C55.1117 15.2998 54.946 15.6033 54.6645 16.054C53.2141 18.376 56.4951 22.294 58.4519 23.4358C57.1877 22.6981 56.0689 22.2721 55.2694 22.0194C50.7802 20.6007 48.4112 24.1259 47.1308 27.9026C47.2848 26.1244 47.6937 24.1188 47.4662 22.3391C47.3336 21.3018 46.6723 20.582 45.6632 20.3458C43.638 19.8717 41.245 20.9031 39.4314 21.7137C40.5008 21.2357 41.644 19.6821 42.4556 18.8586C44.0336 17.2574 45.2307 15.3892 44.3699 13.0868C43.633 11.1161 42.064 9.35627 40.5831 7.90002Z"
        fill="url(#paint20_radial_2114_53137)"
      />
      <path
        d="M43.1367 12.4795C43.0469 12.4294 44.0256 12.8544 45.2264 12.9501C45.8544 13.0001 47.3121 13.1162 48.1715 12.2275C48.761 11.6179 48.8211 10.7918 48.9076 9.60536C48.9661 8.80159 48.9 8.13446 48.8316 7.68643C48.9743 8.32256 49.2897 9.34464 50.0499 10.3731C50.4815 10.957 51.0642 11.7453 51.9508 12.0776C53.3252 12.5928 55.0991 11.8887 56.497 10.456C55.9211 11.1945 55.2764 12.0275 54.5752 12.9434C53.32 14.583 53.2692 14.7976 53.172 15.1223C52.6711 16.7949 55.3494 18.652 56.7454 19.0246C55.8435 18.7839 55.0835 18.7103 54.5492 18.6896C51.5488 18.5734 50.6857 21.1409 50.5345 23.6797C50.3296 22.56 50.2432 21.2575 49.8033 20.2011C49.547 19.5854 49.019 19.2541 48.3585 19.2788C47.0329 19.3284 45.7348 20.3661 44.7558 21.1703C45.3331 20.6961 45.7745 19.5478 46.1349 18.9045C46.8357 17.6537 47.2573 16.3029 46.3398 15.0318C45.5545 13.9438 44.2929 13.1257 43.1367 12.4795Z"
        fill="url(#paint21_linear_2114_53137)"
        style={{
          mixBlendMode: "screen",
        }}
      />
      <path
        d="M49.5888 19.7366C49.5889 19.4459 49.5784 19.0514 49.5331 18.5861C49.4432 17.6606 49.3982 17.1978 49.1743 17.008C48.7351 16.6357 47.6171 17.0656 46.4222 17.9708C46.6502 17.7277 46.9642 17.3698 47.2972 16.906C47.697 16.3491 48.0694 15.8304 48.1887 15.3658C48.5362 14.013 46.8893 12.5319 46.6312 12.3052C46.7032 12.3648 48.3941 13.7364 49.4082 13.1474C49.7058 12.9745 49.8779 12.6719 50.1434 12.2054C50.5319 11.5225 50.7143 10.8948 50.8069 10.4709C50.7848 10.66 50.5186 13.0943 51.3938 13.449C51.5626 13.5174 51.7693 13.4988 52.1827 13.4614C52.81 13.4048 53.3098 13.2689 53.6346 13.1623C52.8076 13.8872 52.1592 14.4345 51.6228 14.8534C51.504 14.9461 51.3075 15.0975 51.2373 15.3557C51.1598 15.6405 51.2774 15.9029 51.7071 16.6644C51.8795 16.9697 52.0903 17.3346 52.3376 17.7445C51.2473 16.8736 50.7697 16.8315 50.5382 16.976C50.2563 17.152 50.3499 17.6092 50.0447 18.5804C49.8918 19.0668 49.7213 19.4598 49.5888 19.7366Z"
        fill="white"
      />
      <path
        style={{
          mixBlendMode: "screen",
        }}
        d="M60.1113 35.7597C59.7128 40.594 55.4713 44.1893 50.6375 43.7909C45.8037 43.3924 42.2082 39.1511 42.6067 34.3168C43.0051 29.4832 47.2466 25.8878 52.0804 26.2863C56.9142 26.6847 60.5097 30.9261 60.1113 35.7597Z"
        fill="url(#paint22_radial_2114_53137)"
      />
      <defs>
        <filter
          id="filter0_f_2114_53137"
          x="5"
          y="13"
          width="81"
          height="81"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="5"
            result="effect1_foregroundBlur_2114_53137"
          />
        </filter>
        <filter
          id="filter1_f_2114_53137"
          x="37.5684"
          y="2.396"
          width="25.2842"
          height="25.2839"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.5"
            result="effect1_foregroundBlur_2114_53137"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2114_53137"
          x1="45"
          y1="1"
          x2="45"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9A0000" />
          <stop offset="1" stop-color="#630000" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2114_53137"
          x1="33.7304"
          y1="30.7492"
          x2="56.0997"
          y2="78.0983"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5F6678" />
          <stop offset="0.6" />
        </linearGradient>
        <radialGradient
          id="paint2_radial_2114_53137"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(43.2959 45.6019) rotate(77.9457) scale(34.4667 34.4667)"
        >
          <stop stop-color="#5F6678" />
          <stop offset="0.771581" />
          <stop offset="0.963542" stop-color="#330909" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_2114_53137"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(40.2677 38.0009) rotate(59.2568) scale(44.9487 44.9487)"
        >
          <stop stop-color="#AC997B" />
          <stop offset="0.360203" stop-color="#5F6678" />
          <stop offset="0.598858" stop-color="#150505" />
          <stop offset="0.948896" stop-color="#300909" />
        </radialGradient>
        <linearGradient
          id="paint4_linear_2114_53137"
          x1="35.3462"
          y1="33.4624"
          x2="37.9248"
          y2="39.8236"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CBCBCB" />
          <stop offset="1" stop-color="#181818" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_2114_53137"
          x1="57.9883"
          y1="26.3886"
          x2="73.3364"
          y2="41.8162"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3B3B3B" />
          <stop offset="0.253723" stop-color="#7B7B7B" />
          <stop offset="0.494722" stop-color="#4B4F5A" />
          <stop offset="0.765625" />
          <stop offset="1" stop-color="#2A2A2A" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_2114_53137"
          x1="61.7809"
          y1="27.6704"
          x2="66.7513"
          y2="37.8701"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9B8C73" />
          <stop offset="1" stop-color="#3A3A3B" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_2114_53137"
          x1="65.9989"
          y1="32.5528"
          x2="66.7965"
          y2="33.899"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_2114_53137"
          x1="55.0347"
          y1="15.715"
          x2="56.6656"
          y2="18.4676"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_2114_53137"
          x1="57.7362"
          y1="15.4138"
          x2="59.6009"
          y2="18.5611"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_2114_53137"
          x1="60.5644"
          y1="15.7629"
          x2="62.6255"
          y2="19.2418"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_2114_53137"
          x1="63.0107"
          y1="17.0049"
          x2="65.1521"
          y2="20.6192"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_2114_53137"
          x1="65.0656"
          y1="19.035"
          x2="67.1177"
          y2="22.4986"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_2114_53137"
          x1="66.5396"
          y1="21.7411"
          x2="68.3102"
          y2="24.7295"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_2114_53137"
          x1="67.304"
          y1="24.8676"
          x2="68.6436"
          y2="27.1288"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_2114_53137"
          x1="67.3563"
          y1="28.0193"
          x2="68.2616"
          y2="29.5474"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_2114_53137"
          x1="66.7053"
          y1="30.7937"
          x2="67.4505"
          y2="32.0514"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_2114_53137"
          x1="53.3298"
          y1="16.5087"
          x2="54.6104"
          y2="18.6702"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C69C6D" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint18_linear_2114_53137"
          x1="44.8833"
          y1="6.76041"
          x2="53.4772"
          y2="24.951"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FEEC41" />
          <stop offset="0.2" stop-color="#FEEC41" />
          <stop offset="0.5" stop-color="#FFCF2D" />
          <stop offset="0.897297" stop-color="#EFA200" />
        </linearGradient>
        <radialGradient
          id="paint19_radial_2114_53137"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(50.1379 15.9208) rotate(4.71229) scale(9.33944 10.1885)"
        >
          <stop stop-color="#D6CD98" />
          <stop offset="0.161512" stop-color="#D67C29" />
          <stop offset="0.279991" stop-color="#B05819" />
          <stop offset="0.435941" stop-color="#847207" />
          <stop offset="0.515181" stop-color="#746300" />
          <stop offset="0.551703" stop-color="#625400" />
          <stop offset="0.638893" stop-color="#3F3600" />
          <stop offset="0.727057" stop-color="#231E00" />
          <stop offset="0.815508" stop-color="#0F0D00" />
          <stop offset="0.90444" stop-color="#030300" />
          <stop offset="0.994624" />
        </radialGradient>
        <radialGradient
          id="paint20_radial_2114_53137"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(50.5676 15.5731) rotate(-119.032) scale(12.5992 12.5992)"
        >
          <stop stop-color="#FE9C41" />
          <stop offset="0.2" stop-color="#FEA741" />
          <stop offset="0.467966" stop-color="#FF3A2D" />
          <stop offset="0.897297" stop-color="#EF001D" />
        </radialGradient>
        <linearGradient
          id="paint21_linear_2114_53137"
          x1="46.5912"
          y1="9.00877"
          x2="54.0471"
          y2="21.5935"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FEEC41" />
          <stop offset="0.2" stop-color="#FEEC41" />
          <stop offset="0.5" stop-color="#FFCF2D" />
          <stop offset="0.897297" stop-color="#EFA200" />
        </linearGradient>
        <radialGradient
          id="paint22_radial_2114_53137"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(51.3553 35.0834) rotate(4.71229) scale(8.78181 8.78183)"
        >
          <stop stop-color="#A7A079" />
          <stop offset="0.161512" stop-color="#A79321" />
          <stop offset="0.279991" stop-color="#817114" />
          <stop offset="0.435941" stop-color="#554A05" />
          <stop offset="0.515181" stop-color="#453B00" />
          <stop offset="0.535724" stop-color="#3F3500" />
          <stop offset="0.648974" stop-color="#231E00" />
          <stop offset="0.763217" stop-color="#0F0D00" />
          <stop offset="0.878097" stop-color="#030300" />
          <stop offset="0.994624" />
        </radialGradient>
      </defs>
    </svg>
  );
};
