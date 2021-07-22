
export default function () {
 const MemberStack = window.MemberStack;
 MemberStack.onReady.then(function(member) {   
  window.member = member;
 })

}