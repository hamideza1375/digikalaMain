import React, { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import { context } from "../../../context/_context";
import { Platform } from "react-native";

const Dropdown = ({ top, value, root, children }) => {
  const { rootOpacity, setrootOpacity, refDropdown, setdropdownValue, setclientX, setclientY, clientY, clientX, shownDropdown, setshownDropdown, width, height } = context()
  const int = useRef()
  const [change, setchange] = useState(false)

  useEffect(() => {
    if (((refDropdown.current?.nativeEvent?.layout?.width !== 0)) && (int.current)) clearInterval(int.current)
  }, [change])


  return (
    <Pressable
      onLayout={(e) => {
        if (e && root) {
          e.persist && e.persist();
          refDropdown.current = e
        }
      }}
      onTouchEnd={(e) => {
        if (Platform.OS !== 'web') {
          setrootOpacity(0)
          setshownDropdown(false); setTimeout(() => { setshownDropdown(true) }, 100); if (!root) {
            setclientX(((refDropdown.current?.nativeEvent?.layout?.width + e.nativeEvent.pageX + 20) >= (width)) ? 1 : (e.nativeEvent.pageX));
            setclientY(!top ?
              ((refDropdown.current?.nativeEvent?.layout?.height + e.nativeEvent.pageY + 20) >= (height)) ? 1 : (e.nativeEvent.pageY)
              :
              ((refDropdown.current?.nativeEvent?.layout?.height + e.nativeEvent.pageY + 20 - e.nativeEvent.pageY - e.nativeEvent.locationY - top) >= (height)) ? 1 : (e.nativeEvent.pageY - e.nativeEvent.locationY - top)
            );
            int.current = setInterval(() => {
              setclientX(((refDropdown.current?.nativeEvent?.layout?.width + e.nativeEvent.pageX + 20) >= (width)) ? 1 : (e.nativeEvent.pageX));
              setclientY(!top ?
                ((refDropdown.current?.nativeEvent?.layout?.height + e.nativeEvent.pageY + 20) >= (height)) ? 1 : (e.nativeEvent.pageY)
                :
                ((refDropdown.current?.nativeEvent?.layout?.height + e.nativeEvent.pageY + 20 - e.nativeEvent.pageY - e.nativeEvent.locationY - top) >= (height)) ? 1 : (e.nativeEvent.pageY - e.nativeEvent.locationY - top)
              );
            }, 200)
            setTimeout(() => { setrootOpacity(1) }, 200);
            setTimeout(() => { setchange(!change) }, 300);
            setdropdownValue(value);
          }
        }
      }}

      onPressOut={(e) => {
        if (Platform.OS === 'web') {
          setrootOpacity(0)
          setshownDropdown(false); setTimeout(() => { setshownDropdown(true) }, 100); if (!root) {
            setclientX(((refDropdown.current?.nativeEvent?.layout?.width + e.nativeEvent.pageX + 20) >= (width)) ? 1 : (e.nativeEvent.pageX));
            setclientY(!top ?
              ((refDropdown.current?.nativeEvent?.layout?.height + e.nativeEvent.pageY + 20) >= (height)) ? 1 : (e.nativeEvent.pageY)
              :
              ((refDropdown.current?.nativeEvent?.layout?.height + e.nativeEvent.pageY + 20 - e.nativeEvent.pageY - e.nativeEvent.locationY - top) >= (height)) ? 1 : (e.nativeEvent.pageY - e.nativeEvent.locationY - top)
            );
            int.current = setInterval(() => {
              setclientX(((refDropdown.current?.nativeEvent?.layout?.width + e.nativeEvent.pageX + 20) >= (width)) ? 1 : (e.nativeEvent.pageX));
              setclientY(!top ?
                ((refDropdown.current?.nativeEvent?.layout?.height + e.nativeEvent.pageY + 20) >= (height)) ? 1 : (e.nativeEvent.pageY)
                :
                ((refDropdown.current?.nativeEvent?.layout?.height + e.nativeEvent.pageY + 20 - e.nativeEvent.pageY - e.nativeEvent.locationY - top) >= (height)) ? 1 : (e.nativeEvent.pageY - e.nativeEvent.locationY - top)
              );
            }, 200)
            setTimeout(() => { setrootOpacity(1) }, 200);
            setTimeout(() => { setchange(!change) }, 300);
            setdropdownValue(value);
          }
        }
      }
      }
      style={root ? ([{
        opacity: rootOpacity,
        display: shownDropdown ? "flex" : 'none', position: 'absolute', zIndex: 1000,
        borderWidth: 1, borderRadius: 3, padding: 5, backgroundColor: '#eee'
      }, clientX !== 1 ? { left: clientX } : { right: 5 },
      clientY !== 1 ? { top: clientY } : { bottom: 5 }]) : { width: '100%', height: '100%' }} >
      {children}
    </Pressable>
  );
}

export default Dropdown