function bruno(mood='idle',cls=''){const o=(typeof OUT!=='undefined'&&OUT)||{scarf:'#43C0F6',hat:'none',glasses:false};return `
<svg class="bruno ${cls}" data-mood="${mood}" viewBox="0 0 200 210" aria-label="Bruno the bear">
 <g class="b-all">
  <ellipse cx="100" cy="203" rx="52" ry="6" fill="rgba(0,0,0,.08)"/>
  <ellipse cx="72" cy="190" rx="21" ry="11" fill="#8F5E3E"/><ellipse cx="128" cy="190" rx="21" ry="11" fill="#8F5E3E"/>
  <ellipse cx="100" cy="152" rx="50" ry="46" fill="#B9825A"/>
  <ellipse cx="100" cy="160" rx="29" ry="31" fill="#F3DDBF"/>
  <g class="arm l"><ellipse cx="48" cy="150" rx="12" ry="24" fill="#A56D47" transform="rotate(9 48 150)" style="transform-box:view-box;transform-origin:0 0"/><ellipse cx="45" cy="171" rx="7.5" ry="6" fill="#F3DDBF"/></g>
  <g class="arm r"><ellipse cx="152" cy="150" rx="12" ry="24" fill="#A56D47" transform="rotate(-9 152 150)" style="transform-box:view-box;transform-origin:0 0"/><ellipse cx="155" cy="171" rx="7.5" ry="6" fill="#F3DDBF"/></g>
  <g class="head">
   <g class="ear l"><circle cx="46" cy="46" r="22" fill="#B9825A"/><circle cx="46" cy="47" r="11" fill="#E8B48F"/></g>
   <g class="ear r"><circle cx="154" cy="46" r="22" fill="#B9825A"/><circle cx="154" cy="47" r="11" fill="#E8B48F"/></g>
   <ellipse cx="100" cy="88" rx="64" ry="56" fill="#B9825A"/>
   <ellipse cx="100" cy="108" rx="31" ry="23" fill="#F3DDBF"/>
   <circle cx="58" cy="104" r="9" fill="#FF9DA8" opacity=".5"/><circle cx="142" cy="104" r="9" fill="#FF9DA8" opacity=".5"/>
   <g class="eye l"><circle cx="76" cy="80" r="15" fill="#fff"/><g class="pupils"><circle cx="77" cy="82" r="9" fill="#3B2A20"/><circle cx="80" cy="78" r="3.4" fill="#fff"/></g></g>
   <g class="eye r"><circle cx="124" cy="80" r="15" fill="#fff"/><g class="pupils"><circle cx="123" cy="82" r="9" fill="#3B2A20"/><circle cx="126" cy="78" r="3.4" fill="#fff"/></g></g>
   <path class="happyeye" d="M62 84q14-18 28 0M110 84q14-18 28 0" stroke="#3B2A20" stroke-width="5.5" stroke-linecap="round" fill="none"/>
   <path class="brow l" d="M60 60q15-8 30 0" stroke="#5A3A26" stroke-width="5" stroke-linecap="round" fill="none" style="transform-origin:75px 60px;transform-box:view-box"/>
   <path class="brow r" d="M110 60q15-8 30 0" stroke="#5A3A26" stroke-width="5" stroke-linecap="round" fill="none" style="transform-origin:125px 60px;transform-box:view-box"/>
   <ellipse cx="100" cy="96" rx="10" ry="7" fill="#4A2E20"/><ellipse cx="97" cy="94" rx="3" ry="1.8" fill="#fff" opacity=".35"/>
   <path class="mth smile" d="M85 110q15 13 30 0" stroke="#4A2E20" stroke-width="4.5" stroke-linecap="round" fill="none"/>
   <g class="mth open"><path d="M83 108q17 30 34 0z" fill="#4A2E20"/><path d="M92 121q8-8 16 0q-8 7-16 0z" fill="#FF7A8A"/></g>
   <path class="mth frown" d="M87 120q13-12 26 0" stroke="#4A2E20" stroke-width="4.5" stroke-linecap="round" fill="none"/>
   <ellipse class="mth o" cx="100" cy="116" rx="6" ry="7" fill="#4A2E20"/>
   ${o.glasses?'<g fill="rgba(255,255,255,.18)" stroke="#12304B" stroke-width="3.6"><circle cx="76" cy="82" r="19"/><circle cx="124" cy="82" r="19"/><path d="M95 82h10" fill="none"/></g>':''}
   ${o.hat==='beanie'?'<path d="M48 56Q52 14 100 12Q148 14 152 56Q100 46 48 56Z" fill="#FFB938"/><path d="M47 54Q100 42 153 54L151 66Q100 54 49 66Z" fill="#12304B"/><circle cx="100" cy="11" r="10" fill="#FFF1D1"/>':''}
   ${o.hat==='cap'?'<path d="M50 54Q54 18 100 16Q146 18 150 54Z" fill="#12304B"/><path d="M96 52h64q10 0 10 9H96z" fill="#0A2236"/><circle cx="100" cy="18" r="4" fill="#43C0F6"/>':''}
  </g>
  <path d="M50 134Q100 168 150 134L154 152Q100 186 46 152Z" fill="${o.scarf}"/>
  <path d="M48 146Q100 180 152 146" stroke="#1A9BD7" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M120 164L136 196L116 202L106 170Z" fill="${o.scarf}"/><path d="M111 187L130 182" stroke="#1A9BD7" stroke-width="5" stroke-linecap="round"/>
 </g>
</svg>`}
