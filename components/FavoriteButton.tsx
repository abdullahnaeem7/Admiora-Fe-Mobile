import React, { useContext } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import appContext from "@/context/appContext";
import {
  useAddToFavorites,
  useRemoveFromFavorites,
} from "@/hooks/useFavourite";
import { useQueryClient } from "@tanstack/react-query";
import { showSuccess } from "@/utils/toastMessage";

const FavoriteButton = ({ productId }: { productId: string }) => {
  const { user, setUser } = useContext(appContext);
  const { mutate: addToFavorites } = useAddToFavorites();
  const { mutate: removeFromFavorites } = useRemoveFromFavorites();
  const queryClient = useQueryClient();

  const toggleFavorite = () => {
    try {
      if (user?.favorites?.includes(productId)) {
        removeFromFavorites(productId, {
          onSuccess: () => {
            showSuccess("removed from favourites");

            setUser({
              ...user,
              favorites: user.favorites.filter(
                (id: string) => id !== productId
              ),
            });

            queryClient.invalidateQueries({ queryKey: ["favorites"] });
          },
        });
      } else {
        addToFavorites(productId, {
          onSuccess: () => {
            setUser({
              ...user,
              favorites: [...user.favorites, productId],
            });

            showSuccess("added to favourites");
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
          },
          onError: (error) => {
            console.error(error);
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableOpacity onPress={toggleFavorite}>
      {user?.favorites?.includes(productId) ? (
        <MaterialIcons name={"favorite"} size={20} color="black" />
      ) : (
        <AntDesign name="hearto" size={20} color="black" />
      )}
    </TouchableOpacity>
  );
};

export default FavoriteButton;
