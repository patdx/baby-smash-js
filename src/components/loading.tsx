export const Loading = ({ comment }: { comment: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    Loading... ({comment})
  </div>
);
